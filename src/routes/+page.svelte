<script lang="ts">
	import type { message } from '../types/message.type';
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import MessageRenderer from '$lib/components/MessageRenderer.svelte';
	import ChatForm from '$lib/components/ChatForm.svelte';

	const socket = io();

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
			Powered by SvelteKit, GCloud and TailwindCSS.
		</p>
		<div>
			<ChatForm {sendMessage} {username} {message} />
		</div>
	</div>

	<div class="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
		<h2 class="text-xl">Live Chat</h2>
		<ul>
			{#each messages as message}
				<li>
					<MessageRenderer {message} />
				</li>
			{/each}
		</ul>
	</div>
</section>
