import { Message, PubSub } from '@google-cloud/pubsub';
import type { PageServerLoad } from './$types';
import type { message } from '../types/message.type';

const projectId = 'leprojetsubv';
const topicName = 'tom';
const subscriptionName = 'tom-sub';
const keyFileName = 'gcloud/gcloud-conf.json';

let messages: message[] = [];

const messageHandler = (message: Message) => {
	const content = message.data.toString();
	const username = message.attributes.username;

	message.ack();

	messages.push({ content, username });

	return messages;
};

function instanciatePubsubClient() {
	return new PubSub({ projectId: projectId, keyFilename: keyFileName });
}

function getSubscriptionToTopic() {
	const pubsub = instanciatePubsubClient();
	const subscription = pubsub.subscription(subscriptionName);

	return subscription;
}

function postMessageToTopic(message: string, sender: string) {
	const pubsub = instanciatePubsubClient();
	const topic = pubsub.topic(topicName);

	const dataBuffer = Buffer.from(message);
	const messageId = topic.publishMessage({ data: dataBuffer, attributes: { username: sender } });

	return messageId;
}

function listenToTopicMessages() {
	const subscription = getSubscriptionToTopic();
	subscription.on('message', messageHandler);
	console.log('Listening to messages...');
	console.log('Messages:', messages.length);
}

export const actions = {
	postMessage: async ({ request }) => {
		const data = await request.formData();
		const message = data.get('message');
		const sender = data.get('username');

		if (!message || !sender) {
			return { status: 400, body: 'Missing attributes.', success: false };
		}

		if (typeof message !== 'string' || typeof sender !== 'string') {
			return { status: 400, body: 'Attributes must be strings.', success: false };
		}

		postMessageToTopic(message, sender);

		return { status: 200, body: 'Message sent', success: true };
	}
};

export const load: PageServerLoad = async () => {
	listenToTopicMessages();
	return { props: { messages } };
}
