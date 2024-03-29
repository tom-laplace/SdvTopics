<script lang="ts">
</script>

<section class="mt-24 mx-auto max-w-screen-xl pb-4 px-4 items-center lg:flex md:px-8">
	<div class="space-y-4 flex-1 sm:text-center lg:text-left">
		<h1 class="text-gray-800 font-bold text-4xl xl:text-5xl">
			Send
			<span class="text-indigo-600"> Live Messages</span>
		</h1>
		<p class="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
			We provide a platform for you to send messages to your friends and family in real-time. Powered by SvelteKit, GCloud pubsub and TailwindCSS to build this project.
		</p>
		<div>
			<p class="text-gray-800 py-3">Try it :</p>
			<form
				class="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start"
			>
				<input
					type="text"
					placeholder="Enter your message"
					class="text-gray-500 border outline-none p-3 rounded-md w-full sm:w-72"
				/>
				<button
					class="outline-none bg-gray-700 text-white text-center px-4 py-3 rounded-md shadow w-full ring-offset-2 ring-gray-700 focus:ring-2 sm:w-auto"
				>
					Send
				</button>
			</form>
		</div>
	</div>


	<!-- Futur direct chat container -->
	<div class="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
		<img
			src="https://i.postimg.cc/kgd4WhyS/container.png"
			class="w-full mx-auto sm:w-10/12 lg:w-full"
			alt="container"
		/>
	</div>
</section>
