<script lang="ts">
	export let username: string;
</script>

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
