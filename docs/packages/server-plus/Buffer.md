# Buffer
Package: <a href="#/packages/server-plus/api">@supercollider/server-plus</a>

<div class="entity-box"><div class="Class"><h3 class="class-header" id="Buffer"><span class="token keyword">class</span> <span class="class">Buffer</span></h3><p class="short-text">scsynth Buffer</p><p class="">See `server.buffer(...)` and `server.readBuffer(...)`
</p><div class="section-heading">Constructor</div><div class="class-member"><h4 id="constructor"><span class="token function">new Buffer</span>(<span class="nowrap">server: <span class="type reference">ServerPlus</span></span>, <span class="nowrap">id: <span class="type token entity">number</span></span>, <span class="nowrap">numFrames: <span class="type token entity">number</span></span>, <span class="nowrap">numChannels: <span class="type token entity">number</span></span>): <span class="type reference">Buffer</span></h4></div><div class="section-heading">Property</div><div class="class-member"><h4 id="id"><span class="token property">id</span> <span class="type token entity">number</span></h4></div><div class="class-member"><h4 id="numChannels"><span class="token property">numChannels</span> <span class="type token entity">number</span></h4></div><div class="class-member"><h4 id="numFrames"><span class="token property">numFrames</span> <span class="type token entity">number</span></h4></div><div class="class-member"><h4 id="server"><span class="token property">server</span> <span class="type reference">ServerPlus</span></h4></div><div class="section-heading">Method</div><div class="class-member"><h4 id="free"><span class="token function">free</span>(): <span class="type reference">Promise&lt;<span class="type token entity">void</span>&gt;</span></h4><p class="short-text">Deallocate the Buffer, freeing memory on the server.</p></div></div></div>