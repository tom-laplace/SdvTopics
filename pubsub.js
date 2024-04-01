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

/**
 * @param {string} content
 * @param {string} username
 */
function publishMessage(content, username) {
	try {
		topic.publishMessage({
			data: Buffer.from(content),
			attributes: { username: username }
		});
	} catch (error) {
		console.error(`Received error: ${error}`);
	}
}

/**
 * @param {any} io
 */
function initSubscription(io) {
	subscription.on('message', (message) => {
		io.emit('message', {
			content: message.data.toString(),
			username: message.attributes.username
		});

		message.ack();
	});
}

export { publishMessage, initSubscription };
