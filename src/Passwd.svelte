<script>

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let pass = ''
    let visable = true

    function onUpdate(e) {
         dispatch('update', {value: e.target.value})
    }
    function onVisable(e) {
         dispatch('visable', {value: e.target.checked})
    }
</script>
<style>
.passwd-input {
    background: #0006;
    width: 411px;
    height: 25px;
    border: 2px solid #808080;
    /*border-radius: 5px;*/
    color: white;
    font-family: Pixel1;
    padding-left: 5px;
    margin: 3px 0 0 0px
}
.passwd-input:focus {
    outline:none;
}
.passwd-visable {
    margin-left: -25px;
}
</style>
<input bind:value={pass} on:input={onUpdate}
    placeholder="Password"
    class="passwd-input">
<input type=checkbox bind:checked={visable}
    on:input={onVisable}
    class="passwd-visable">
