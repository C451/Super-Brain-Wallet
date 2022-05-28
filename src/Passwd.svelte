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
    width: 412px;
    height: 25px;
    border: 2px solid #808080;
    /*border-radius: 5px;*/
    color: white;
    font-family: Pixel1;
    padding-left: 5px;
    /*margin: 3px 0 0 0px;*/
    float: left;
}
.passwd-wrap {
    margin: 3px 0 0 2px;
}
.passwd-input:focus {
    outline:none;
}
.passwd-visable {
    margin-left: -25px;
    float: left;
    margin-top: 8px;
}
</style>
<div class="passwd-wrap">
    <input bind:value={pass} on:input={onUpdate}
        placeholder="Password"
        class="passwd-input">
    <input type=checkbox bind:checked={visable}
        on:input={onVisable}
        class="passwd-visable">
</div>
