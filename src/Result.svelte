<script>

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let result = {seed: [], hex: ''}

    $:seed = result.seed.join(' ')

    function close() {
        dispatch('close')
    }

</script>
<style>
.result {
    position: absolute;
    z-index: 200;
    width: 422px;
    height: 610px;
    background: #000000e0;
    top: 64px;
    border: 3px solid #666;
    box-shadow: inset 0px 0 20px 20px #00ff9309;
}
.close-result {
    font-size: 2em;
    position: absolute;
    top: 2px;
    right: 5px;
    padding: 0 10px;
    user-select: none;
    cursor: pointer;
}
textarea {
    width: 90%;
    background: none;
    color: #fff;
    font-family: 'Pixel1';
    font-size: 1.25em;
    border: none;
    margin-top: 10px;
    resize: none;
    text-align: center;
}
.seed-lbl {
    margin-top: 60px;
    color: gray;
}
.seed {
    height: 25%;
}
.hex-lbl {
    margin-top: 60px;
    color: gray;
}
.hex {
    height: 15%;
}
.okay {
    background: #2ab52a;
    padding: 10px;
    margin: 50px;
    font-size: 2em;
    user-select: none;
    cursor: pointer;
}
.okay:hover {
    filter: brightness(1.1);
}
</style>
<div class="result">
    <div class="close-result"
        on:click={close}>
         x
    </div>
    <div class="seed-lbl">Seed Phrase</div>
    <textarea class="seed">{seed}</textarea>
    <div class="hex-lbl">Hex Value</div>
    <textarea class="hex">{result.hex}</textarea>
    <div class="okay" on:click={close}>Okay</div>
</div>
