<script lang="ts">
    export let message: string;
</script>

<div class="w-full max-w-md px-4 mx-auto mt-4">
	<label for="message" class="block py-2 text-gray-500"> Message </label>
	<textarea
		placeholder="Hello, how are you doing today?"
		name="message"
		id="message"
		class="w-full p-2.5 bg-gray-50 rounded-md outline-none"
		bind:value={message}
	></textarea>
</div>
