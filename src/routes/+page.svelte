<script lang="ts">
	import type { message } from '../types/message.type';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';

	const socket = io();
	const projectId = 'leprojetsubv';
	const topicName = 'tom';
	const subscriptionName = 'tom-sub';
	const keyFileName = 'gcloud/gcloud-conf.json';

	onMount(() => {
		socket.on('message', (message: message) => {
			messages = [...messages, message];
		});
	});

	let message = '';
	let username = '';
	let messages: message[] = [];

	function sendMessage(username: string, message: string) {
		if (!username || !message) return;

		let messageToSend: message = {
			username,
			content: message
		};

		socket.emit('message', messageToSend);
	}
</script>

<section class="mt-24 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
	<div class="space-y-4 flex-1 sm:text-center lg:text-left">
		<h1 class="text-gray-800 font-bold text-4xl xl:text-5xl">
			Send
			<span class="text-indigo-600"> Live Messages</span>
		</h1>
		<p class="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
			We provide a platform for you to send messages to your friends and family in real-time.
			Powered by SvelteKit, GCloud pubsub and TailwindCSS to build this project.
		</p>
		<div>
			<p class="text-gray-500">Enter your username and write a message to start chatting :</p>
			<form
				on:submit|preventDefault={() => sendMessage(username, message)}
				class="flex flex-col items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start"
			>
				<div class="w-full max-w-md px-4 mx-auto">
					<label for="username" class="block py-2 text-gray-500"> Username </label>
					<div class="flex items-center text-gray-400 border rounded-md">
						<div class="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">@</div>
						<input
							type="text"
							placeholder="Alain Duglas"
							name="username"
							id="username"
							class="w-full p-2.5 ml-2 bg-transparent outline-none"
							bind:value={username}
						/>
					</div>
				</div>

				<div class="w-full max-w-md px-4 mx-auto mt-4">
					<label for="username" class="block py-2 text-gray-500"> Message </label>
					<textarea
						placeholder="Hello, how are you doing today?"
						name="message"
						id="message"
						class="w-full p-2.5 bg-gray-50 rounded-md outline-none"
						bind:value={message}
					></textarea>
				</div>

				<button
					class="px-5 py-2.5 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
					type="submit"
				>
					Send it
				</button>
			</form>
		</div>
	</div>

	<div class="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
		<h2 class="text-xl">Live Chat</h2>
		<ul>
			{#each messages as message}
				<li>
					<div class="flex items-center space-x-2 my-2">
						<div>
							<p class="text-gray-800 font-semibold">{message.username}</p>
							<p class="text-gray-500">{message.content}</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
