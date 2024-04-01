<script lang="ts">
	import type { message } from '../../types/message.type';

	export let message: message;
</script>

<div class="flex items-center space-x-2 my-2">
	<div>
		<p class="text-gray-800 font-semibold">{message.username}</p>
		<p class="text-gray-500">{message.content}</p>
	</div>
</div>
