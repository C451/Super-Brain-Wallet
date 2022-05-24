<script>

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let color = 15
    let tools = []
    // Apple II Palette
    let palette = [
        '#ffffff', '#ffff00', '#ff6500', '#dc0000',
        '#ff0097', '#360097', '#0000ca', '#0097ff',
        '#00a800', '#006500', '#653600', '#976536',
        '#b9b9b9', '#868686', '#454545', '#000000'
    ]
    for (let i = 0; i < palette.length; i++) {
        tools.push({type: 'color', color: palette[i]})
    }

    function onClick(index) {
        color = index
        dispatch('colorSelect', {index})
    }

</script>
<style>
.color-tools {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto;
    background-color: rgba(25, 25, 25, 1);
    padding: 3px;
    width: 420px;
    height: 100px;
    color: gray;
    user-select: none;
    margin: 3px 0 0 0;
}
.color-tool {
    background-color: rgba(25, 25, 25, 1);
    border: 1px solid rgba(25, 25, 25, 1);
    padding: 20px;
    font-size: 16px;
    text-align: center;
}
.color-tool:hover {
    filter: brightness(1.5);
}
.color-selected {
    border: 3px solid rgba(25, 250, 25, 1);
    margin: -2px -2px;
    z-index: 100;
}
</style>
<div class="color-tools">
    {#each tools as tool, index}
		<div class="color-tool"
            style={`background-color: ${tool.color}`}
            class:color-selected={color === index}
            on:click={() => onClick(index)}>
        </div>
	{/each}
</div>
