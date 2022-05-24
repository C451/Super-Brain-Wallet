<script>

    import { createEventDispatcher, onMount } from 'svelte'

    const dispatch = createEventDispatcher()

    export let color
    export let enc_data // Pass protected color data
    export let pv  // Password visable
    let color_data = Array(8*8).fill(null).map(x => ({color: 15}))
    let paint = false
    let palette = [
        '#ffffff', '#ffff00', '#ff6500', '#dc0000',
        '#ff0097', '#360097', '#0000ca', '#0097ff',
        '#00a800', '#006500', '#653600', '#976536',
        '#b9b9b9', '#868686', '#454545', '#000000'
    ]
    function mouseDown(i, e) {
        color_data[i].color = color
        sendUpdate()
    }
    function mouseMove(i, e) {
        if (paint) {
            color_data[i].color = color
            sendUpdate()
        }
    }
    function sendUpdate() {
        dispatch('update', {data: color_data})
    }
    onMount(() => {
        sendUpdate()
    })
</script>
<style>
.key-grid {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto;
    background-color: rgba(25, 25, 25, 1);
    padding: 3px;
    width: 420px;
    height: 420px;
    color: gray;
    user-select: none;
    background: repeating-linear-gradient(
       -45deg,
       #666,
       #666 10px,
       #333 10px,
       #333 20px
     );
}
.key-pixel {
    background-color: rgba(25, 25, 25, 1);
    border: 1px solid rgba(25, 25, 25, 1);
    padding: 20px;
    font-size: 16px;
    text-align: center;
}
.key-pixel:hover {
    filter: brightness(1.5);
}
</style>
<div class="key-grid"
    on:mousedown={e => paint = true}
    on:mouseup={e => paint = false}
    on:mouseleave={e => paint = false}>
    {#each (pv ? enc_data : color_data) as pixel, index}
		<div class="key-pixel"
            style={`background-color: ${palette[pixel.color]}`}
            on:mousedown={e => mouseDown(index, e)}
            on:mousemove={e => mouseMove(index, e)}>
        </div>
	{/each}
</div>
