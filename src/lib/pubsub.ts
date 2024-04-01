import { PubSub } from '@google-cloud/pubsub';

const pathConfigFile = 'gcloud/gcloud-conf.json';
const topicName = 'tom';
const subscriptionName = 'tom-sub';
const projectId = 'leprojetsubv';

const pubsub = new PubSub({
	projectId: projectId,
	keyFile: pathConfigFile
});

const topic = pubsub.topic(topicName);
const subscription = pubsub.subscription(subscriptionName);

function publishMessage(content: string, username: string) {
	try {
		topic.publishMessage({
			data: Buffer.from(content),
			attributes: { username: username }
		});
	} catch (error) {
		console.error(`Received error: ${error}`);
	}
}

function initSubscription() {
	subscription.on('message', (message) => {
		console.log('Received message:', message.data.toString());
		process.exit(0);
	});
}

export { publishMessage, initSubscription };