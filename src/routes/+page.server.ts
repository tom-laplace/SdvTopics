// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import type { PageServerLoad } from './$types';

const projectId = 'leprojetsubv';
const topicName = 'tom';
const subscriptionName = 'tom-sub';
const keyFileName = 'gcloud/gcloud-conf.json'

function instanciatePubsubClient() {
	const pubsub = new PubSub({ projectId: projectId, keyFilename: keyFileName});

	return pubsub;
}

function getSubscriptionToTopic() {
	const pubsub = instanciatePubsubClient();
	const topic = pubsub.topic(topicName);
	const subscription = topic.subscription(subscriptionName);

	return subscription;
}

function postMessageToTopic(message: string, sender: string) {
	const pubsub = instanciatePubsubClient();
	const topic = pubsub.topic(topicName);

	const dataBuffer = Buffer.from(message);
	const messageId = topic.publishMessage({ data: dataBuffer, attributes: { name: sender } });

	console.log(`Message ${messageId} published.`);

	return messageId;
}

