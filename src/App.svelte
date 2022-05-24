<!-- App.svelte -->
<script>
  /* component logic will go here */
  import Grid from "./Grid.svelte"
  import Palette from "./Palette.svelte"
  import Passwd from "./Passwd.svelte"
  import Result from "./Result.svelte"
  import * as lib from "./encoder.js"

  let color = 15; // Default color index
  let color_data = [] // Base color data
  let enc_data = [] // Pass protected color data
  let key_data = []
  let pass = ''
  let passVisable = true
  let result = {hex:'', seed:[]}
  let showResult = false

  function onColor(event) {
      color = event.detail.index
  }
  function onGrid(event) {
      color_data = event.detail.data
      update()
  }
  function onPasswd(event) {
      pass = event.detail.value
      update()
  }
  function onPassVisable(event) {
      passVisable = event.detail.value
  }
  async function update() {
      let base = lib.colorsToBits(color_data)
      let mod = await lib.passToBits2(pass)
      let res = lib.XOR(base, mod)
      enc_data = lib.bitsToColors(res)
      let hex = lib.bitsToHexKey(res)
      let seed = await lib.bitsToSeedPhrase(res)

      console.log(hex)
      console.log(seed)
      result = {hex, seed}
  }
  function generate() {
      if (!pass.length) {
          return alert(`Password cannot be empty`)
      }
      if (color_data.every(x => x.color === 15)) {
          return alert(`Empty image is not very secure...`)
      }
      showResult = true
  }
  function closeResult() {
      showResult = false
  }
</script>
<style>
.App {
     margin: 0 auto;
     width: 420px;
     text-align: center;
     font-family: Pixel1;
}
h2 {
    font-family: Pixel2;
    color: #dde0de; /*#00ff68;*/
    margin: 20px 0;
    font-size: 1.5em;
    white-space: nowrap;
    text-shadow: 4px 4px black;
    transform: scale(1, 1.25);
    user-select: none;
}
.generate {
    font-size: 1.5em;
    margin: 5px 0 0 5px;
    user-select: none;
    cursor: pointer;
    color: #ddd;
    text-shadow: 2px 2px black;
    /*background: #00a800;*/
}
.generate:hover {
    color: #fff;
}
</style>
<div class="App">
    <h2>Super Brain Wallet</h2>
    <Grid color={color} enc_data={enc_data}
        pv={passVisable}
        on:update={onGrid}/>
    <Palette on:colorSelect={onColor}/>
    <Passwd on:update={onPasswd}
            on:visable={onPassVisable}/>
    <div class="generate"
        on:click={generate}>
        GENERATE
    </div>
    {#if showResult}
        <Result result={result}
            on:close={closeResult}/>
    {/if}
</div>
