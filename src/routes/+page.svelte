<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});

	export let form: ActionData;
	export let data: PageServerData;

	$: data;
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
				method="post"
				action="?/postMessage"
				use:enhance
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
					></textarea>
				</div>

				<button
					class="px-5 py-2.5 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
				>
					Send it
				</button>
			</form>
			{#if form?.success}
				<p>{form?.body || ''}</p>
			{/if}

			{#if !form?.success}
				<p>{form?.body || ''}</p>
			{/if}
		</div>
	</div>

	<div class="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
		<h2>Messages</h2>
		<ul>
			{#each data.props.messages as message}
				<li>
					<div class="flex items-center space-x-2">
						<div class="w-8 h-8 bg-gray-200 rounded-full"></div>
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
