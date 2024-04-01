<script lang="ts">
	import UsernameInput from '$lib/components/inputs/UsernameInput.svelte';
	import MessageInput from '$lib/components/inputs/MessageInput.svelte';

	export let message: string;
	export let username: string;
	export let sendMessage: (username: string, message: string) => void;
</script>

<p class="text-gray-500">Enter your username and write a message to start chatting :</p>
<form
	on:submit|preventDefault={() => sendMessage(username, message)}
	class="flex flex-col items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start"
>
	<UsernameInput bind:username />
	<MessageInput bind:message />

	<button
		class="px-5 py-2.5 text-white bg-indigo-600 rounded-md duration-150 hover:bg-indigo-700 active:shadow-lg"
		type="submit"
	>
		Send it
	</button>
</form>
