(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>440*2**((e-69)/12),t=class{ctx=null;master;sfxBus;noiseBuffer;songBus=null;songTimer=null;muted=!1;unlock(){if(!this.ctx){let e=new AudioContext;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:.8;let t=e.createDynamicsCompressor();this.master.connect(t),t.connect(e.destination),this.sfxBus=e.createGain(),this.sfxBus.connect(this.master);let n=e.createBuffer(1,e.sampleRate,e.sampleRate),r=n.getChannelData(0);for(let e=0;e<r.length;e++)r[e]=Math.random()*2-1;this.noiseBuffer=n}this.ctx.state===`suspended`&&this.ctx.resume()}toggleMute(){return this.muted=!this.muted,this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:.8,this.ctx.currentTime,.02),this.muted}note(e,t,n,r={}){if(!this.ctx)return null;let{type:i=`sine`,gain:a=.2,attack:o=.005,release:s=.08,dest:c=this.sfxBus,glideTo:l}=r,u=this.ctx.createOscillator(),d=this.ctx.createGain();return u.type=i,u.frequency.setValueAtTime(e,t),l&&u.frequency.exponentialRampToValueAtTime(l,t+n),d.gain.setValueAtTime(1e-4,t),d.gain.exponentialRampToValueAtTime(a,t+o),d.gain.setValueAtTime(a,t+Math.max(o,n-s)),d.gain.exponentialRampToValueAtTime(1e-4,t+n),u.connect(d),d.connect(c),u.start(t),u.stop(t+n+.02),u}bell(e,t,n=.9,r=.14,i=this.sfxBus){if(this.ctx)for(let[a,o,s]of[[1,1,1],[2.01,.45,.7],[3.98,.22,.4]]){let c=this.ctx.createOscillator(),l=this.ctx.createGain();c.frequency.value=e*a,l.gain.setValueAtTime(r*o,t),l.gain.exponentialRampToValueAtTime(1e-4,t+n*s),c.connect(l),l.connect(i),c.start(t),c.stop(t+n*s+.02)}}noise(e,t,n,r,i=`bandpass`,a=1,o=this.sfxBus,s){if(!this.ctx)return;let c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer,c.loop=!0;let l=this.ctx.createBiquadFilter();l.type=i,l.frequency.setValueAtTime(n,e),s&&l.frequency.exponentialRampToValueAtTime(s,e+t),l.Q.value=a;let u=this.ctx.createGain();u.gain.setValueAtTime(r,e),u.gain.exponentialRampToValueAtTime(1e-4,e+t),c.connect(l),l.connect(u),u.connect(o),c.start(e,Math.random()*.8),c.stop(e+t+.02)}get now(){return this.ctx?this.ctx.currentTime:0}pick(t){let n=this.now;switch(this.noise(n,.16,900,.12,`bandpass`,1.2,this.sfxBus,3200),t){case`bell`:this.bell(e(84),n+.03),this.bell(e(91),n+.12);break;case`sparkle`:this.sparkle(n+.03,7);break;case`fart`:this.fart(n+.03);break;case`clang`:for(let e of[420,613,871])this.note(e,n+.03,.35,{type:`square`,gain:.05});this.note(240,n+.2,.3,{type:`triangle`,gain:.14,glideTo:120});break;case`ring`:this.phoneRing(n+.03,1)}}sparkle(t,n){let r=[84,88,91,96,100,103,108];for(let i=0;i<n;i++)this.bell(e(r[i%r.length]),t+i*.06,.45,.07)}fart(e){if(!this.ctx)return;let t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),r=this.ctx.createGain(),i=this.ctx.createBiquadFilter(),a=this.ctx.createGain();t.type=`sawtooth`,t.frequency.setValueAtTime(115,e),t.frequency.exponentialRampToValueAtTime(58,e+.6),n.type=`square`,n.frequency.setValueAtTime(34,e),n.frequency.linearRampToValueAtTime(19,e+.6),r.gain.value=26,i.type=`lowpass`,i.frequency.value=620,a.gain.setValueAtTime(1e-4,e),a.gain.exponentialRampToValueAtTime(.42,e+.03),a.gain.setValueAtTime(.42,e+.42),a.gain.exponentialRampToValueAtTime(1e-4,e+.65),n.connect(r),r.connect(t.frequency),t.connect(i),i.connect(a),a.connect(this.sfxBus),n.start(e),t.start(e),n.stop(e+.68),t.stop(e+.68)}meow(e,t=!1){if(!this.ctx)return;let n=this.now,r=t?.9:.5,i=this.ctx.createOscillator(),a=this.ctx.createBiquadFilter(),o=this.ctx.createGain();i.type=`sawtooth`,i.frequency.setValueAtTime(e*.8,n),i.frequency.exponentialRampToValueAtTime(e*(t?1.05:1.45),n+r*.35),i.frequency.exponentialRampToValueAtTime(e*(t?.5:.75),n+r),a.type=`bandpass`,a.Q.value=3,a.frequency.setValueAtTime(700,n),a.frequency.exponentialRampToValueAtTime(1900,n+r*.4),a.frequency.exponentialRampToValueAtTime(600,n+r),o.gain.setValueAtTime(1e-4,n),o.gain.exponentialRampToValueAtTime(.5,n+.05),o.gain.exponentialRampToValueAtTime(1e-4,n+r),i.connect(a),a.connect(o),o.connect(this.sfxBus),i.start(n),i.stop(n+r+.02)}phoneRing(e=this.now,t=2){for(let n=0;n<t;n++){let t=e+n*.55;for(let e=0;e<9;e++){let n=t+e*.045;this.note(e%2?1320:1760,n,.04,{type:`square`,gain:.055,attack:.002,release:.01})}}}jump(){this.note(320,this.now,.14,{type:`triangle`,gain:.16,glideTo:760})}gift(){let t=this.now;this.bell(e(88),t,.25,.08),this.bell(e(95),t+.06,.35,.07)}heart(){let t=this.now;[76,80,83,88].forEach((n,r)=>this.bell(e(n),t+r*.08,.4,.09))}hurt(){let e=this.now;this.note(300,e,.3,{type:`square`,gain:.1,glideTo:90}),this.noise(e,.15,900,.25,`bandpass`,1.2)}boing(){let t=this.now;this.note(170,t,.22,{type:`sine`,gain:.25,glideTo:620}),this.bell(e(96),t+.02,.2,.04)}crunch(){let e=this.now;for(let t=0;t<3;t++)for(let n=0;n<5;n++)this.noise(e+t*.32+n*.022,.05,1800+Math.random()*2600,.22,`bandpass`,1.6)}flash(){this.noise(this.now,.07,5200,.1,`highpass`)}tick(){this.note(1500,this.now,.05,{type:`square`,gain:.05,attack:.002,release:.02})}whoosh(){this.noise(this.now,.4,500,.2,`bandpass`,1.1,this.sfxBus,4e3)}splash(){let e=this.now;this.noise(e,.35,1800,.3,`bandpass`,.8,this.sfxBus,600);for(let t=0;t<6;t++)this.note(600+Math.random()*900,e+.03+t*.05,.06,{type:`sine`,gain:.08,glideTo:1600})}rocket(){this.noise(this.now,.9,700,.17,`lowpass`,.7,this.sfxBus,2400)}fire(){let e=this.now;this.noise(e,1.6,500,.24,`lowpass`,.5,this.sfxBus,1600);for(let t=0;t<26;t++)this.noise(e+Math.random()*1.6,.02,3500,.16,`highpass`)}poof(){let e=this.now;this.noise(e,.4,2600,.3,`lowpass`,.7,this.sfxBus,300),this.note(420,e,.18,{type:`triangle`,gain:.16,glideTo:120})}tada(){let t=this.now;[72,76,79,84].forEach((n,r)=>this.note(e(n),t+r*.09,r===3?.7:.14,{type:`sawtooth`,gain:.11})),this.noise(t+.27,.5,5e3,.12,`highpass`)}applause(e=2){let t=this.now;for(let n=0;n<e*45;n++)this.noise(t+Math.random()*e,.05,1200+Math.random()*2400,.09,`bandpass`,1.4)}power(t){let n=this.now;switch(t){case`rosa`:this.note(180,n,1.5,{type:`sawtooth`,gain:.1,glideTo:2200,release:.25}),this.sparkle(n+.5,14);break;case`gra`:[45,48,45,52].forEach((t,r)=>this.note(e(t),n+r*.2,.17,{type:`triangle`,gain:.26})),this.note(500,n+1.15,.13,{type:`sine`,gain:.24,glideTo:180}),this.noise(n+1.2,.08,1200,.2),this.bell(e(88),n+1.35,.5,.1),this.bell(e(91),n+1.5,.6,.1);break;case`gron`:this.poof();for(let e=0;e<14;e++)this.noise(n+.15+e*.07,.05,5e3+Math.random()*3e3,.09,`highpass`);break;case`julgran`:for(let e=0;e<18;e++)this.noise(n+e*.075,.06,3400,.14,`bandpass`,2);this.sparkle(n+.4,14);break;case`regnbage`:[60,64,67,72,76,79,84,88,91,96].forEach((t,r)=>this.bell(e(t),n+r*.07,.9,.09)),[84,88,91,96].forEach(t=>this.bell(e(t),n+.9,1.6,.06)),this.sparkle(n+1.1,10);break;case`rod`:case`orange`:case`gul`:case`bla`:case`lila`:this.note(220,n,.5,{type:`triangle`,gain:.18,glideTo:880});for(let e=0;e<12;e++){let t=n+.55+e*.11+Math.random()*.04;this.noise(t,.09,700+Math.random()*500,.22,`lowpass`),this.note(320+Math.random()*160,t,.1,{type:`sine`,gain:.16,glideTo:90})}this.sparkle(n+1.9,8);break;case`silver`:for(let e=0;e<12;e++){let t=n+e*.25;this.note(140,t,.12,{type:`sine`,gain:.35,glideTo:45}),this.noise(t+.125,.04,8e3,.08,`highpass`)}[76,79,83,86,83,79].forEach((t,r)=>this.bell(e(t),n+.5+r*.4,.4,.08));break;case`guld`:for(let t=0;t<22;t++)this.bell(e(93+t%4*2),n+.2+t*.09+Math.random()*.03,.25,.06);this.sparkle(n+.4,12);break;case`rymd`:this.note(220,n,1.4,{type:`sine`,gain:.18,glideTo:880}),this.note(880,n+1.4,1.4,{type:`sine`,gain:.18,glideTo:330}),[84,88,91,96,91,88].forEach((t,r)=>this.note(e(t),n+.3+r*.38,.09,{type:`square`,gain:.05})),this.sparkle(n+1,10);break;case`hav`:this.noise(n,1.6,400,.35,`lowpass`,1,this.sfxBus,2600),this.noise(n+1.5,1,2600,.3,`lowpass`,1,this.sfxBus,300);for(let e=0;e<10;e++)this.note(900+Math.random()*900,n+1.6+e*.07,.06,{type:`sine`,gain:.07,glideTo:1800});break;case`saga`:[72,76,79,84,88,91,96].forEach((t,r)=>this.bell(e(t),n+r*.12,.7,.09)),this.sparkle(n+.6,10);for(let e=0;e<7;e++){let t=n+1.3+e*.22+Math.random()*.05;this.note(170+Math.random()*60,t,.11,{type:`square`,gain:.07,glideTo:110})}break;case`djungel`:this.note(140,n,1.1,{type:`sawtooth`,gain:.22,glideTo:60}),this.noise(n,1.2,500,.4,`lowpass`,1,this.sfxBus,180);for(let e=0;e<8;e++)this.note(1800+Math.random()*600,n+1.3+e*.16,.08,{type:`sine`,gain:.06,glideTo:2600});break;case`svart`:case`vit`:case`tiger`:case`trefarg`:case`siames`:case`smoking`:for(let e=0;e<60;e++)this.noise(n+e*.04,.035,160,.16,`lowpass`);for(let e=0;e<40;e++)this.noise(n+2.6+e*.04,.035,160,.13,`lowpass`);this.bell(e(84),n+1.3,.5,.1),this.bell(e(91),n+1.42,.7,.1),this.sparkle(n+2.4,6);break;case`nisse`:this.poof();for(let e=0;e<10;e++){let t=240+Math.random()*260;this.note(t,n+.3+e*.13,.09,{type:`sine`,gain:.2,glideTo:t*2.2})}}}sadTrombone(){if(!this.ctx)return;let t=this.now+.05;for(let[n,r,i]of[[58,0,.42],[57,.5,.42],[56,1,.42],[55,1.5,1.5]]){let a=t+r,o=this.ctx.createOscillator(),s=this.ctx.createBiquadFilter(),c=this.ctx.createGain();if(o.type=`sawtooth`,o.frequency.setValueAtTime(e(n),a),s.type=`lowpass`,s.Q.value=7,s.frequency.setValueAtTime(320,a),s.frequency.exponentialRampToValueAtTime(1400,a+.14),s.frequency.exponentialRampToValueAtTime(420,a+i),c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(.32,a+.04),c.gain.setValueAtTime(.32,a+i*.7),c.gain.exponentialRampToValueAtTime(1e-4,a+i),i>1){let t=this.ctx.createOscillator(),r=this.ctx.createGain();t.frequency.value=5.5,r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(7,a+.5),t.connect(r),r.connect(o.frequency),t.start(a),t.stop(a+i+.02),o.frequency.linearRampToValueAtTime(e(n)*.94,a+i)}o.connect(s),s.connect(c),c.connect(this.sfxBus),o.start(a),o.stop(a+i+.02)}this.note(120,t+3.1,.14,{type:`sine`,gain:.25,glideTo:60})}fanfare(){let t=this.now+.03;for(let[n,r,i]of[[67,0,.14],[67,.16,.14],[67,.32,.14],[72,.48,.5],[67,1,.2],[72,1.22,.2],[76,1.44,.2],[79,1.66,.9]])this.note(e(n),t+r,i,{type:`sawtooth`,gain:.13,attack:.02}),this.note(e(n+12),t+r,i,{type:`square`,gain:.04,attack:.02});this.noise(t+1.66,.9,6e3,.15,`highpass`)}music(e){if(this.stopSong(),!e||!this.ctx)return;let t=this.ctx.createGain();t.gain.value=0,t.gain.linearRampToValueAtTime(e===`catwalk`?.75:.85,this.ctx.currentTime+.4),t.connect(this.master),this.songBus=t;let{stepSeconds:n,steps:r,play:i}=a[e](this,t),o=0,s=this.ctx.currentTime+.08,c=this.ctx,l=()=>{for(;s<c.currentTime+.25;)i(o%r,s),o+=1,s+=n};l(),this.songTimer=window.setInterval(l,80)}stopSong(){if(this.songTimer!==null&&window.clearInterval(this.songTimer),this.songTimer=null,this.songBus&&this.ctx){let e=this.songBus;e.gain.cancelScheduledValues(this.ctx.currentTime),e.gain.setTargetAtTime(0,this.ctx.currentTime,.08),window.setTimeout(()=>e.disconnect(),1200)}this.songBus=null}mBell(t,n,r,i=.7,a=.13){this.bell(e(t),n,i,a,r)}mPluck(t,n,r,i=.2,a=.26,o=`triangle`){this.note(e(t),n,i,{type:o,gain:a,dest:r,release:i*.6})}mLead(t,n,r,i=.2,a=.1){this.note(e(t),n,i,{type:`square`,gain:a,dest:r,release:.05})}mSleigh(e,t,n=.05){this.noise(e,.06,7500,n,`bandpass`,5,t),this.noise(e+.008,.05,9500,n*.6,`bandpass`,6,t)}mKick(e,t){this.note(150,e,.16,{type:`sine`,gain:.42,dest:t,glideTo:45,release:.1})}mClap(e,t){this.noise(e,.12,1700,.24,`bandpass`,1,t)}};function n(e,t){let n=[72,0,76,79,81,79,76,0,77,0,74,77,76,72,67,0,69,0,72,77,76,0,74,72,74,0,79,0,74,71,67,0,72,0,76,79,84,81,79,0,81,0,77,81,79,76,72,0,77,76,74,72,69,72,77,76,74,0,71,74,72,0,0,0],r=[48,53,53,55,48,53,50,55];return{stepSeconds:.26785714285714285,steps:n.length,play:(i,a)=>{let o=n[i];o&&e.mBell(o,a,t,.7,.12);let s=Math.floor(i/8),c=i%8,l=r[s];c===0&&e.mPluck(l,a,t,.3,.28),c===4&&e.mPluck(l+7,a,t,.3,.22),(c===2||c===6)&&(e.mPluck(l+16,a,t,.14,.07),e.mPluck(l+19,a,t,.14,.07)),c%2==0&&e.mSleigh(a,t,.022)}}}function r(e,t){let n=60/124/4,r=[41,38,46,48],i=new Map([[0,[77,2]],[3,[81,1]],[6,[84,2]],[10,[81,1]],[12,[79,3]],[16,[74,2]],[19,[77,1]],[22,[81,2]],[26,[79,1]],[28,[77,3]],[32,[70,2]],[35,[74,1]],[38,[77,2]],[42,[79,1]],[44,[81,3]],[48,[79,2]],[51,[76,1]],[54,[72,2]],[58,[76,1]],[60,[79,2]],[62,[84,2]]]);return{stepSeconds:n,steps:128,play:(a,o)=>{let s=a%64,c=s%16,l=r[Math.floor(s/16)];c%4==0&&e.mKick(o,t),(c===4||c===12)&&e.mClap(o,t),c%2==0&&e.mSleigh(o,t,c%4==2?.075:.035);let u=[0,0,12,0,0,12,0,12][Math.floor(c/2)];if(c%2==0&&e.mPluck(l+u,o,t,.14,.28,`sawtooth`),c===2||c===6||c===10||c===14)for(let n of[24,28,31])e.mPluck(l+n-+(l===38),o,t,.09,.035,`sawtooth`);if(a>=64){let r=i.get(s);r&&(e.mLead(r[0],o,t,r[1]*n,.08),e.mBell(r[0]+12,o,t,.45,.06))}}}}function i(e,t){let n=60/168/2,r=[[76,2],[76,2],[76,4],[76,2],[76,2],[76,4],[76,2],[79,2],[72,3],[74,1],[76,8],[77,2],[77,2],[77,3],[77,1],[77,2],[76,2],[76,2],[76,1],[76,1],[76,2],[74,2],[74,2],[76,2],[74,4],[79,4],[76,2],[76,2],[76,4],[76,2],[76,2],[76,4],[76,2],[79,2],[72,3],[74,1],[76,8],[77,2],[77,2],[77,3],[77,1],[77,2],[76,2],[76,2],[76,1],[76,1],[79,2],[79,2],[77,2],[74,2],[72,8]],i=new Map,a=0;for(let[e,t]of r)i.set(a,[e,t]),a+=t;let o=[48,48,48,48,53,48,50,55,48,48,48,48,53,48,55,48];return{stepSeconds:n,steps:a,play:(r,a)=>{let s=i.get(r);if(s){let[r,i]=s;e.mBell(r+12,a,t,.7,.13),e.mLead(r,a,t,Math.max(.1,i*n*.85),.07)}let c=Math.floor(r/8),l=r%8,u=o[c],d=u===50?15:16;if((l===0||l===4)&&e.mPluck(u-(l===4?5:0),a,t,.25,.3),l===2||l===6){for(let n of[d,19,24])e.mPluck(u+n,a,t,.13,.05,`sawtooth`);e.mClap(a,t)}(l===0||l===4)&&e.mKick(a,t),e.mSleigh(a,t,l%2?.05:.08)}}}var a={menu:n,catwalk:r,winner:i},o=new t,s=[`head`,`top`,`shoes`,`tail`],c={head:`Huvudbonad`,top:`Tröja`,shoes:`Tass-skor`,tail:`Svans`},l=[{id:`rosa`,group:`jul`,name:`Rosa katten`,powerName:`Spinn-chock`,power:`Spinn-chock med rosa stjärnor`,powerShout:`SPINN-CHOCK!`,fur:`#ff94c8`,furDark:`#e2609f`,belly:`#ffe0ef`,innerEar:`#ffd0e6`,nose:`#d92f7f`,iris:`#7a3ff2`,voice:760,powerStyle:4,powerBus:3},{id:`gra`,group:`jul`,name:`Gråa katten`,powerName:`Rökt räka`,power:`Mutar med en rökt räka`,powerShout:`PSST… EN RÖKT RÄKA?`,fur:`#aab2c0`,furDark:`#737c8c`,belly:`#e4e7ec`,innerEar:`#f0c3cd`,nose:`#c75a72`,iris:`#e7a81c`,voice:520,powerStyle:1,powerBus:6},{id:`julgran`,group:`jul`,name:`Julgranskatten`,powerName:`Barrskakningen`,power:`Skakar av sig barr och glitter`,powerShout:`BARR OCH GLITTER ÖVERALLT!`,fur:`#2f9c5e`,furDark:`#16683a`,belly:`#7fd39c`,innerEar:`#ffd34d`,nose:`#e5322d`,iris:`#ffbe2e`,voice:440,powerStyle:5,powerBus:2},{id:`nisse`,group:`jul`,name:`Nissekatten`,powerName:`Grötmagi`,power:`Trollar fram en skål julgröt`,powerShout:`VARSÅGOD, JULGRÖT!`,fur:`#f19a4a`,furDark:`#c76a22`,belly:`#ffe6c7`,innerEar:`#ffc7a6`,nose:`#e5322d`,iris:`#2a7de1`,voice:580,powerStyle:4,powerBus:3},{id:`regnbage`,group:`jul`,name:`Regnbågskatten`,powerName:`Regnbågsbron`,power:`Trollar fram en regnbåge över catwalken`,powerShout:`REGNBÅGSBRON!`,fur:`#ff9f43`,furDark:`#c75dff`,belly:`#ffffff`,innerEar:`#fff3b0`,nose:`#ff4fa8`,iris:`#7a3ff2`,voice:700,powerStyle:4,powerBus:3},{id:`silver`,group:`jul`,name:`Silverkatten`,powerName:`Discokulan`,power:`Hänger upp en discokula så att hela salen dansar`,powerShout:`DISCO!`,fur:`#c9d1dc`,furDark:`#7f8a9c`,belly:`#f1f4f8`,innerEar:`#f3c9d4`,nose:`#e58aa0`,iris:`#3a6ff0`,voice:900,powerStyle:4,powerBus:3},{id:`guld`,group:`jul`,name:`Guldkatten`,powerName:`Guldregnet`,power:`Får det att regna guldmynt över domarna`,powerShout:`GULDREGN!`,fur:`#f2c230`,furDark:`#b07d0a`,belly:`#fff4c4`,innerEar:`#ffd9a0`,nose:`#c0612b`,iris:`#1fa35d`,voice:640,powerStyle:4,powerBus:3},{id:`rod`,group:`farg`,name:`Röda katten`,powerName:`Färgbomben`,power:`Målar hela catwalken röd`,powerShout:`RÖD FÄRGBOMB!`,fur:`#ff5c5c`,furDark:`#c92f36`,belly:`#ffe1dd`,innerEar:`#ffc4c4`,nose:`#8f1d2c`,iris:`#3fcf72`,voice:620,powerStyle:4,powerBus:3},{id:`orange`,group:`farg`,name:`Orangea katten`,powerName:`Färgbomben`,power:`Målar hela catwalken orange`,powerShout:`ORANGE FÄRGBOMB!`,fur:`#ff9a2e`,furDark:`#d2650a`,belly:`#ffead0`,innerEar:`#ffd2a8`,nose:`#b33c0c`,iris:`#2a7de1`,voice:560,powerStyle:4,powerBus:3},{id:`gul`,group:`farg`,name:`Gula katten`,powerName:`Färgbomben`,power:`Målar hela catwalken gul`,powerShout:`GUL FÄRGBOMB!`,fur:`#ffd83a`,furDark:`#d39d00`,belly:`#fff8d2`,innerEar:`#ffe9a0`,nose:`#e0701f`,iris:`#3a6ff0`,voice:820,powerStyle:4,powerBus:3},{id:`gron`,group:`farg`,name:`Gröna katten`,powerName:`Julklappsknepet`,power:`Kamouflerar sig som julklapp`,powerShout:`VART TOG KATTEN VÄGEN?`,fur:`#a4e36a`,furDark:`#62ad3a`,belly:`#e4f8c9`,innerEar:`#f6e38b`,nose:`#3a7a22`,iris:`#d5372f`,voice:640,powerStyle:3,powerBus:4},{id:`bla`,group:`farg`,name:`Blåa katten`,powerName:`Färgbomben`,power:`Målar hela catwalken blå`,powerShout:`BLÅ FÄRGBOMB!`,fur:`#5cb2ff`,furDark:`#2a72cf`,belly:`#e2f1ff`,innerEar:`#c8e3ff`,nose:`#ff5f93`,iris:`#ffbe2e`,voice:480,powerStyle:4,powerBus:3},{id:`lila`,group:`farg`,name:`Lila katten`,powerName:`Färgbomben`,power:`Målar hela catwalken lila`,powerShout:`LILA FÄRGBOMB!`,fur:`#b27dff`,furDark:`#7944d6`,belly:`#f1e7ff`,innerEar:`#e4d2ff`,nose:`#ff4fa8`,iris:`#3fcf72`,voice:680,powerStyle:4,powerBus:3},{id:`svart`,group:`vanlig`,name:`Svarta katten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#4a4453`,furDark:`#2c2833`,belly:`#5d5767`,innerEar:`#9a7486`,nose:`#9a7486`,iris:`#f2c21b`,voice:600,powerStyle:4,powerBus:3},{id:`vit`,group:`vanlig`,name:`Vita katten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#f7f5f0`,furDark:`#d3cec4`,belly:`#ffffff`,innerEar:`#ffc4cf`,nose:`#ff9fb0`,iris:`#4fb3ff`,voice:780,powerStyle:4,powerBus:3},{id:`tiger`,group:`vanlig`,name:`Tigerkatten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#b48d66`,furDark:`#6b4c33`,belly:`#f1e2ce`,innerEar:`#f3c6b4`,nose:`#c0705a`,iris:`#7cc242`,voice:540,powerStyle:4,powerBus:3},{id:`trefarg`,group:`vanlig`,name:`Trefärgade katten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#fffaf2`,furDark:`#d8cdbd`,belly:`#ffffff`,innerEar:`#ffc9c9`,nose:`#ff9fae`,iris:`#e9a23b`,voice:720,powerStyle:4,powerBus:3},{id:`siames`,group:`vanlig`,name:`Siameskatten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#f2e3c8`,furDark:`#5e4033`,belly:`#fff7ea`,innerEar:`#7a5546`,nose:`#4a3028`,iris:`#3f8fff`,voice:860,powerStyle:4,powerBus:3},{id:`smoking`,group:`vanlig`,name:`Smokingkatten`,powerName:`Garnnystanet`,power:`Leker med ett garnnystan tills alla smälter`,powerShout:`GARNNYSTAN!`,fur:`#45404d`,furDark:`#29252f`,belly:`#ffffff`,innerEar:`#9a7486`,nose:`#ff9fb0`,iris:`#7cc242`,voice:500,powerStyle:4,powerBus:3},{id:`astronaut`,group:`rymd`,name:`Astronautkatten`,powerName:`Tyngdlösheten`,power:`Svävar tyngdlöst runt bland stjärnorna`,powerShout:`TYNGDLÖS!`,fur:`#f4f6fb`,furDark:`#9aa6bd`,belly:`#ffffff`,innerEar:`#ffc4cf`,nose:`#ff9fb0`,iris:`#45a7ff`,voice:700,powerStyle:4,powerBus:3},{id:`mane`,group:`rymd`,name:`Månkatten`,powerName:`Tyngdlösheten`,power:`Svävar tyngdlöst runt bland stjärnorna`,powerShout:`TYNGDLÖS!`,fur:`#dcd7ee`,furDark:`#8f86b3`,belly:`#f6f3ff`,innerEar:`#c9b8ff`,nose:`#b48cff`,iris:`#ffd23f`,voice:820,powerStyle:4,powerBus:3},{id:`stjarn`,group:`rymd`,name:`Stjärnkatten`,powerName:`Tyngdlösheten`,power:`Svävar tyngdlöst runt bland stjärnorna`,powerShout:`TYNGDLÖS!`,fur:`#2f3778`,furDark:`#181d4f`,belly:`#4a529c`,innerEar:`#9a8cff`,nose:`#ffd23f`,iris:`#ffd23f`,voice:640,powerStyle:4,powerBus:3},{id:`pirat`,group:`hav`,name:`Piratkatten`,powerName:`Jättevågen`,power:`Surfar in på en jättevåg och blöter ner domarna`,powerShout:`SURFVÅG!`,fur:`#c9844a`,furDark:`#8a5228`,belly:`#f3dcc0`,innerEar:`#f3b9a0`,nose:`#a8553a`,iris:`#7cc242`,voice:500,powerStyle:4,powerBus:3},{id:`sjojungfru`,group:`hav`,name:`Sjöjungfrukatten`,powerName:`Jättevågen`,power:`Surfar in på en jättevåg och blöter ner domarna`,powerShout:`SURFVÅG!`,fur:`#62d3c8`,furDark:`#2a9d9f`,belly:`#c8fff5`,innerEar:`#ff9fc7`,nose:`#ff7fae`,iris:`#9b5cff`,voice:880,powerStyle:4,powerBus:3},{id:`sjoman`,group:`hav`,name:`Sjömanskatten`,powerName:`Jättevågen`,power:`Surfar in på en jättevåg och blöter ner domarna`,powerShout:`SURFVÅG!`,fur:`#f2ece0`,furDark:`#3a5aa8`,belly:`#ffffff`,innerEar:`#ffc4cf`,nose:`#ff9fb0`,iris:`#3f8fff`,voice:600,powerStyle:4,powerBus:3},{id:`prinsessa`,group:`saga`,name:`Prinsesskatten`,powerName:`Grodförtrollningen`,power:`Trollar fram en hel svärm av grodor`,powerShout:`SIM SALA BIM!`,fur:`#ffd6ec`,furDark:`#e78ac0`,belly:`#fff2f9`,innerEar:`#ff9fd0`,nose:`#ff6fae`,iris:`#9b5cff`,voice:900,powerStyle:4,powerBus:3},{id:`trollkarl`,group:`saga`,name:`Trollkarlskatten`,powerName:`Grodförtrollningen`,power:`Trollar fram en hel svärm av grodor`,powerShout:`SIM SALA BIM!`,fur:`#6a5acd`,furDark:`#3c2f8f`,belly:`#a99cf0`,innerEar:`#c9b8ff`,nose:`#ffd23f`,iris:`#ffd23f`,voice:560,powerStyle:4,powerBus:3},{id:`enhorning`,group:`saga`,name:`Enhörningskatten`,powerName:`Grodförtrollningen`,power:`Trollar fram en hel svärm av grodor`,powerShout:`SIM SALA BIM!`,fur:`#ffffff`,furDark:`#c9b8e8`,belly:`#fff6fd`,innerEar:`#ffb3d9`,nose:`#ffa6c9`,iris:`#ff6fb5`,voice:840,powerStyle:4,powerBus:3},{id:`lejon`,group:`djungel`,name:`Lejonkatten`,powerName:`Djungelvrålet`,power:`Vrålar så att löven yr och publiken hoppar`,powerShout:`VRÅÅÅL!`,fur:`#f2b04a`,furDark:`#b86f1c`,belly:`#fde3b2`,innerEar:`#f6b38d`,nose:`#8a4a2a`,iris:`#7cc242`,voice:420,powerStyle:4,powerBus:3},{id:`leopard`,group:`djungel`,name:`Leopardkatten`,powerName:`Djungelvrålet`,power:`Vrålar så att löven yr och publiken hoppar`,powerShout:`VRÅÅÅL!`,fur:`#f1c97a`,furDark:`#6b4a22`,belly:`#fff1d4`,innerEar:`#f3c6b4`,nose:`#c0705a`,iris:`#3fbf6f`,voice:560,powerStyle:4,powerBus:3},{id:`panda`,group:`djungel`,name:`Pandakatten`,powerName:`Djungelvrålet`,power:`Vrålar så att löven yr och publiken hoppar`,powerShout:`VRÅÅÅL!`,fur:`#ffffff`,furDark:`#2b2733`,belly:`#ffffff`,innerEar:`#4a4453`,nose:`#2b2733`,iris:`#7a5546`,voice:680,powerStyle:4,powerBus:3}],u=e=>l.filter(t=>t.group===e),d=[{id:`tomteluva`,slot:`head`,name:`Tomteluva`,style:9,bus:1,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Klassisk tomteluva. Tomten själv nickar gillande.`},{id:`pepparkakshatt`,slot:`head`,name:`Pepparkakshatt`,style:8,bus:2,naughty:!1,themes:[`pepparkaka`],sound:`bell`,quip:`En pepparkakshatt! Hoppas ingen blir sugen.`},{id:`renoron`,slot:`head`,name:`Renöron`,style:8,bus:2,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Renöron! Nu hör katten tomtens släde på flera mils håll.`},{id:`julljus-hatt`,slot:`head`,name:`Lysande julljus`,style:4,bus:6,naughty:!0,themes:[`ljus`,`julgran`],sound:`sparkle`,quip:`Lysande julljus på huvudet. Syns ända från rymden!`},{id:`soptunna`,slot:`head`,name:`Soptunna`,style:1,bus:9,naughty:!0,themes:[],sound:`clang`,quip:`Är det där en soptunna? Det ÄR en soptunna!`},{id:`bajshatt`,slot:`head`,name:`Bajshatt`,style:2,bus:9,naughty:!0,themes:[`bajs`],sound:`fart`,quip:`En bajshatt. Djärvt. Mycket djärvt. Och det luktar.`},{id:`regnbagshatt`,slot:`head`,name:`Regnbågshatt`,style:8,bus:2,naughty:!1,themes:[`regnbage`],sound:`sparkle`,quip:`En regnbåge på huvudet! Finns det en skatt i slutet?`},{id:`fargmossa`,slot:`head`,name:`Mössa i din färg`,style:8,bus:2,naughty:!1,themes:[`farg`],sound:`sparkle`,quip:`En stickad mössa i exakt samma färg som pälsen. Ton i ton!`},{id:`luciakrona`,slot:`head`,name:`Luciakrona`,style:9,bus:1,naughty:!1,themes:[`ljus`],sound:`sparkle`,quip:`En luciakrona med levande ljus. Hela salen sjunger Sankta Lucia!`},{id:`kastrull`,slot:`head`,name:`Grötkastrull`,style:2,bus:8,naughty:!0,themes:[],sound:`clang`,quip:`En kastrull på huvudet. Och det var visst gröt kvar i den!`},{id:`keps`,slot:`head`,name:`Keps`,style:6,bus:4,naughty:!1,themes:[`vardag`],sound:`bell`,quip:`En helt vanlig keps. Katten ser ut att vara på väg till skolan.`},{id:`solglasogon`,slot:`head`,name:`Solglasögon`,style:7,bus:3,naughty:!1,themes:[`vardag`],sound:`sparkle`,quip:`Solglasögon inomhus. Så cool att domarna fryser!`},{id:`guldkrona`,slot:`head`,name:`Guldkrona`,style:9,bus:1,naughty:!1,themes:[`glitter`],sound:`sparkle`,quip:`En guldkrona med ädelstenar. Catwalkens kung!`},{id:`rymdhjalm`,slot:`head`,name:`Rymdhjälm`,style:8,bus:2,naughty:!1,themes:[`rymd`],sound:`sparkle`,quip:`En rymdhjälm av glas. Nu kan katten andas på månen!`},{id:`blackfisk`,slot:`head`,name:`Bläckfisk`,style:2,bus:8,naughty:!0,themes:[`hav`],sound:`fart`,quip:`En bläckfisk på huvudet! Den sprutar bläck på domarna.`},{id:`pirathatt`,slot:`head`,name:`Pirathatt`,style:8,bus:2,naughty:!1,themes:[`hav`],sound:`bell`,quip:`Arrr! En pirathatt med dödskalle. Skatten är nära.`},{id:`trollkarlshatt`,slot:`head`,name:`Trollkarlshatt`,style:8,bus:2,naughty:!1,themes:[`saga`],sound:`sparkle`,quip:`En trollkarlshatt full av stjärnor. Akta så att inget försvinner!`},{id:`safarihatt`,slot:`head`,name:`Safarihatt`,style:7,bus:3,naughty:!1,themes:[`djungel`],sound:`bell`,quip:`En safarihatt. Katten spanar efter lejon, eller kanske möss.`},{id:`orm`,slot:`head`,name:`Orm`,style:2,bus:8,naughty:!0,themes:[`djungel`],sound:`fart`,quip:`En orm på huvudet! Den väser åt publiken.`},{id:`svettband`,slot:`head`,name:`Svettband`,style:7,bus:3,naughty:!1,themes:[`sport`],sound:`bell`,quip:`Ett svettband. Katten är redo att springa maraton.`},{id:`tomtedrakt`,slot:`top`,name:`Tomtedräkt`,style:10,bus:0,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Tomtedräkt med guldspänne. Ren elegans.`},{id:`pepparkaksdrakt`,slot:`top`,name:`Pepparkaksdräkt`,style:8,bus:2,naughty:!1,themes:[`pepparkaka`],sound:`bell`,quip:`Pepparkaksdräkt med kristyr. Knaprig och stilren.`},{id:`julgransdrakt`,slot:`top`,name:`Julgransdräkt`,style:9,bus:1,naughty:!1,themes:[`julgran`],sound:`bell`,quip:`Julgransdräkten barrar lite, men vem bryr sig?`},{id:`bajskorvdrakt`,slot:`top`,name:`Bajskorvdräkt`,style:1,bus:9,naughty:!0,themes:[`bajs`],sound:`fart`,quip:`Bajskorvdräkten! Publiken håller för näsan och jublar.`},{id:`ljusdrakt`,slot:`top`,name:`Ljusdräkt`,style:4,bus:7,naughty:!0,themes:[`ljus`],sound:`sparkle`,quip:`Ljusdräkten lyser upp hela salen. Släck taket!`},{id:`mobildrakt`,slot:`top`,name:`Mobildräkt`,style:3,bus:8,naughty:!0,themes:[],sound:`ring`,quip:`Mobildräkten. Och nu ringer mamma. Igen.`},{id:`regnbagstroja`,slot:`top`,name:`Regnbågströja`,style:9,bus:1,naughty:!1,themes:[`regnbage`],sound:`sparkle`,quip:`Regnbågströjan. Alla färger på en gång, inga kompromisser.`},{id:`fargtroja`,slot:`top`,name:`Tröja i din färg`,style:9,bus:1,naughty:!1,themes:[`farg`],sound:`sparkle`,quip:`En mjuk tröja med hjärta, i kattens alldeles egen färg.`},{id:`julklappsdrakt`,slot:`top`,name:`Julklappsdräkt`,style:9,bus:1,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Inslagen som en julklapp med guldsnöre. Får man skaka på den?`},{id:`kalsonger`,slot:`top`,name:`Kalsonger utanpå`,style:1,bus:9,naughty:!0,themes:[],sound:`fart`,quip:`Linne med fläck och hjärtkalsonger UTANPÅ. Domarna vet inte var de ska titta!`},{id:`hoodie`,slot:`top`,name:`Mjukis-hoodie`,style:7,bus:3,naughty:!1,themes:[`vardag`],sound:`bell`,quip:`En mysig hoodie med ficka. Perfekt att gömma godis i.`},{id:`randig`,slot:`top`,name:`Randig tröja`,style:7,bus:3,naughty:!1,themes:[`vardag`],sound:`bell`,quip:`Randig tröja, som en riktig sjökatt. Ahoj!`},{id:`silverkavaj`,slot:`top`,name:`Silverkavaj`,style:9,bus:1,naughty:!1,themes:[`glitter`],sound:`sparkle`,quip:`En glittrande silverkavaj. Den blänker i varenda kamerablixt.`},{id:`rymddrakt`,slot:`top`,name:`Rymddräkt`,style:8,bus:2,naughty:!1,themes:[`rymd`],sound:`bell`,quip:`En riktig rymddräkt med knappar. Tryck inte på den röda!`},{id:`piratrock`,slot:`top`,name:`Piratrock`,style:8,bus:2,naughty:!1,themes:[`hav`],sound:`bell`,quip:`En röd piratrock med guldknappar. Kaptenen själv skulle buga.`},{id:`prinsessklanning`,slot:`top`,name:`Prinsessklänning`,style:9,bus:1,naughty:!1,themes:[`saga`],sound:`sparkle`,quip:`En rosa prinsessklänning med pärlor. Hela salen suckar.`},{id:`lovdrakt`,slot:`top`,name:`Lövdräkt`,style:7,bus:3,naughty:!1,themes:[`djungel`],sound:`bell`,quip:`En dräkt av djungelblad. Helt ekologisk!`},{id:`fotbollstroja`,slot:`top`,name:`Fotbollströja`,style:7,bus:3,naughty:!1,themes:[`sport`],sound:`bell`,quip:`Fotbollströja med nummer tio. Katten är lagets stjärna!`},{id:`pepparkaksskor`,slot:`shoes`,name:`Pepparkaksskor`,style:8,bus:2,naughty:!1,themes:[`pepparkaka`],sound:`bell`,quip:`Pepparkaksskor. Se upp så att de inte smulas sönder.`},{id:`julgransskor`,slot:`shoes`,name:`Julgransskor`,style:8,bus:2,naughty:!1,themes:[`julgran`],sound:`bell`,quip:`Julgransskor med små kulor på tårna.`},{id:`tomteskor`,slot:`shoes`,name:`Tomteskor`,style:9,bus:1,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Tomteskor! Perfekta för att smyga genom skorstenen.`},{id:`ljusskor`,slot:`shoes`,name:`Ljusskor`,style:2,bus:8,naughty:!0,themes:[`ljus`],sound:`sparkle`,quip:`Oj! Ljusskorna har bundit ihop benen. Katten måste hoppa!`},{id:`regnbagsskor`,slot:`shoes`,name:`Regnbågsskor`,style:8,bus:2,naughty:!1,themes:[`regnbage`],sound:`sparkle`,quip:`Regnbågsskor. Varje steg blir sex färger.`},{id:`fargskor`,slot:`shoes`,name:`Stövlar i din färg`,style:8,bus:2,naughty:!1,themes:[`farg`],sound:`sparkle`,quip:`Stövlar som matchar pälsen. Ingen vet var katten slutar och skorna börjar!`},{id:`renhovar`,slot:`shoes`,name:`Renhovar`,style:8,bus:2,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`Renhovar med bjällror. Klipp-klapp, precis som Rudolf!`},{id:`simfotter`,slot:`shoes`,name:`Simfötter`,style:2,bus:7,naughty:!0,themes:[],sound:`clang`,quip:`Simfötter på catwalken. Flipp, flopp, flipp, flopp!`},{id:`bananskal`,slot:`shoes`,name:`Bananskal`,style:2,bus:8,naughty:!0,themes:[],sound:`clang`,quip:`Bananskal på tassarna? Det här kan gå riktigt halt!`},{id:`gympaskor`,slot:`shoes`,name:`Gympaskor`,style:7,bus:3,naughty:!1,themes:[`vardag`],sound:`bell`,quip:`Gympaskor! Snabbast på hela catwalken.`},{id:`gummistovlar`,slot:`shoes`,name:`Gummistövlar`,style:6,bus:4,naughty:!1,themes:[`vardag`],sound:`bell`,quip:`Gula gummistövlar. Katten letar efter vattenpölar.`},{id:`guldskor`,slot:`shoes`,name:`Guldskor`,style:8,bus:2,naughty:!1,themes:[`glitter`],sound:`sparkle`,quip:`Guldskor med klack. Klick, klack, kling!`},{id:`raketskor`,slot:`shoes`,name:`Raketskor`,style:5,bus:5,naughty:!1,themes:[],sound:`clang`,quip:`Raketskor! Tre, två, ett… LYFT!`},{id:`molnskor`,slot:`shoes`,name:`Molnskor`,style:8,bus:2,naughty:!1,themes:[`regnbage`],sound:`sparkle`,quip:`Molnskor! Katten svävar ut över publiken!`},{id:`solskor`,slot:`shoes`,name:`Solskor`,style:1,bus:9,naughty:!0,themes:[],sound:`sparkle`,quip:`Solskor. De är väldigt varma… lite FÖR varma…`},{id:`maanskor`,slot:`shoes`,name:`Månskor`,style:7,bus:3,naughty:!1,themes:[`rymd`],sound:`sparkle`,quip:`Månskor! Katten studsar fram som om den vore på månen.`},{id:`snackskor`,slot:`shoes`,name:`Snäckskor`,style:8,bus:2,naughty:!1,themes:[`hav`],sound:`sparkle`,quip:`Snäckskor från havets botten. Det brusar när katten går.`},{id:`glasskor`,slot:`shoes`,name:`Glasskor`,style:8,bus:2,naughty:!1,themes:[`saga`],sound:`sparkle`,quip:`Glasskor! Hoppas katten inte tappar en i trappan.`},{id:`kokosskor`,slot:`shoes`,name:`Kokosnötsskor`,style:5,bus:5,naughty:!1,themes:[`djungel`],sound:`clang`,quip:`Kokosnötsskor! Klipp-klopp, klipp-klopp.`},{id:`fotbollsskor`,slot:`shoes`,name:`Fotbollsskor`,style:7,bus:3,naughty:!1,themes:[`sport`],sound:`bell`,quip:`Fotbollsskor med dobbar. Den här katten gör mål!`},{id:`julkulor`,slot:`tail`,name:`Julkulor`,style:8,bus:2,naughty:!1,themes:[`julgran`],sound:`bell`,quip:`Julkulorna i svansen klingar vid varje steg.`},{id:`pepparkakssmulor`,slot:`tail`,name:`Pepparkakssmulor`,style:4,bus:5,naughty:!1,themes:[`pepparkaka`],sound:`bell`,quip:`Svansen strör smulor över catwalken. Städaren gråter.`},{id:`julstjarna`,slot:`tail`,name:`Julstjärna`,style:9,bus:1,naughty:!1,themes:[`julgran`,`tomte`],sound:`sparkle`,quip:`Julstjärnan i svansen. En riktig toppstjärna!`},{id:`julljus-svans`,slot:`tail`,name:`Julljus`,style:5,bus:5,naughty:!1,themes:[`ljus`,`julgran`],sound:`sparkle`,quip:`Julljus runt svansen. De blinkar i takt med musiken.`},{id:`regnbagssvans`,slot:`tail`,name:`Regnbågsband`,style:7,bus:3,naughty:!1,themes:[`regnbage`],sound:`sparkle`,quip:`Regnbågsband i svansen fladdrar som en drake.`},{id:`fargrosett`,slot:`tail`,name:`Rosett i din färg`,style:8,bus:2,naughty:!1,themes:[`farg`],sound:`sparkle`,quip:`En stor rosett på svansen, i samma färg som katten. Som ett paket!`},{id:`julstrumpa`,slot:`tail`,name:`Julstrumpa`,style:8,bus:2,naughty:!1,themes:[`tomte`],sound:`bell`,quip:`En julstrumpa med polkagris hänger i svansen. Vad finns i den?`},{id:`fiskben`,slot:`tail`,name:`Gammalt fiskben`,style:2,bus:8,naughty:!0,themes:[],sound:`fart`,quip:`Ett gammalt fiskben i svansen. Flugorna älskar det. Domarna inte.`},{id:`toapapper`,slot:`tail`,name:`Toapapper`,style:2,bus:8,naughty:!0,themes:[`bajs`],sound:`fart`,quip:`Toapapper som släpar efter svansen. Hela vägen från toaletten!`},{id:`ballong`,slot:`tail`,name:`Ballong`,style:6,bus:4,naughty:!1,themes:[`vardag`],sound:`sparkle`,quip:`En ballong knuten i svansen. Hoppas den inte flyger iväg!`},{id:`harsnodd`,slot:`tail`,name:`Hårsnodd`,style:7,bus:3,naughty:!1,themes:[`vardag`],sound:`sparkle`,quip:`En fluffig hårsnodd på svansen. Snyggt och praktiskt.`},{id:`glitterboa`,slot:`tail`,name:`Silverboa`,style:8,bus:2,naughty:!1,themes:[`glitter`],sound:`sparkle`,quip:`En fluffig silverboa som glittrar vid varje svansvift.`},{id:`planetring`,slot:`tail`,name:`Planet med ring`,style:8,bus:2,naughty:!1,themes:[`rymd`],sound:`sparkle`,quip:`En liten planet med ring på svansen. Saturnus är avundsjuk.`},{id:`papegoja`,slot:`tail`,name:`Papegoja`,style:6,bus:4,naughty:!1,themes:[`hav`],sound:`ring`,quip:`Papegojan skriker: Snygg katt! Snygg katt!`},{id:`trollstav`,slot:`tail`,name:`Trollstav`,style:8,bus:2,naughty:!1,themes:[`saga`],sound:`sparkle`,quip:`En trollstav i svansen. Pling, så blev domarna glada!`},{id:`apa`,slot:`tail`,name:`Liten apa`,style:4,bus:6,naughty:!1,themes:[`djungel`],sound:`bell`,quip:`En liten apa hänger i svansen och gör miner åt domarna.`},{id:`pompom`,slot:`tail`,name:`Pompom`,style:7,bus:3,naughty:!1,themes:[`sport`],sound:`sparkle`,quip:`En pompom på svansen. Heja, heja katten!`}],f=Object.fromEntries(d.map(e=>[e.id,e])),p=e=>d.filter(t=>t.slot===e);function m(e,t=Math.random){let n=p(e),r=Math.floor(t()*n.length),i=Math.floor(t()*(n.length-1));return i>=r&&(i+=1),[n[r],n[i]]}var ee=[`Hej, det är mamma!`,`Har du ätit något?`,`Har du mössa på dig?`,`Varför svarar du inte?`,`Vi äter gröt klockan fem!`,`Ring när du är framme!`],h=()=>matchMedia(`(prefers-reduced-motion: reduce)`).matches,g=e=>new Promise(t=>window.setTimeout(t,e));function _(e){let t=e.getContext(`2d`);if(!t||h())return;let n=Array.from({length:110},()=>({x:Math.random()*1600,y:Math.random()*900,r:1.5+Math.random()*3.5,v:.4+Math.random()*1.1,phase:Math.random()*Math.PI*2})),r=performance.now(),i=e=>{let a=Math.min((e-r)/16.7,4);r=e,t.clearRect(0,0,1600,900),t.fillStyle=`rgba(255,255,255,.75)`;for(let e of n)e.y+=e.v*a,e.phase+=.012*a,e.y>910&&(e.y=-10,e.x=Math.random()*1600),t.beginPath(),t.arc(e.x+Math.sin(e.phase)*18,e.y,e.r,0,Math.PI*2),t.fill();requestAnimationFrame(i)};requestAnimationFrame(i)}var v=[`#ff4b4b`,`#ffd23f`,`#3fdc7c`,`#45b7ff`,`#ff6bd6`,`#ffffff`];function y(e){let t=e.getContext(`2d`);if(!t)return()=>void 0;let n=!0,r=h()?40:240,i=Array.from({length:r},()=>({x:Math.random()*1600,y:-40-Math.random()*700,w:8+Math.random()*10,h:12+Math.random()*12,vy:2+Math.random()*3.5,sway:Math.random()*Math.PI*2,spin:Math.random()*Math.PI,spinV:.04+Math.random()*.14,color:v[Math.floor(Math.random()*v.length)]})),a=performance.now(),o=e=>{if(!n)return;let r=Math.min((e-a)/16.7,4);a=e,t.clearRect(0,0,1600,900);for(let e of i)e.y+=e.vy*r,e.sway+=.03*r,e.spin+=e.spinV*r,e.y>920&&(e.y=-30,e.x=Math.random()*1600),t.save(),t.translate(e.x+Math.sin(e.sway)*30,e.y),t.rotate(e.spin),t.scale(1,Math.cos(e.spin*1.4)),t.fillStyle=e.color,t.fillRect(-e.w/2,-e.h/2,e.w,e.h),t.restore();requestAnimationFrame(o)};return requestAnimationFrame(o),()=>{n=!1,t.clearRect(0,0,1600,900)}}function b(e,t){let[n,r]=t.distance??[120,420],[i,a]=t.angle??[0,360],[o,s]=t.duration??[800,1500];for(let c=0;c<t.count;c++){let l=document.createElement(`div`);l.className=`particle`;let u=typeof t.size==`function`?t.size(c):t.size??40;l.style.width=`${u}px`,l.style.height=`${u}px`;let d=t.x+(Math.random()-.5)*(t.spread??0),f=t.y+(Math.random()-.5)*(t.spread??0);l.style.left=`${d-u/2}px`,l.style.top=`${f-u/2}px`,l.innerHTML=t.html(c),e.appendChild(l);let p=(i+Math.random()*(a-i))*Math.PI/180,m=n+Math.random()*(r-n),ee=Math.cos(p)*m,h=Math.sin(p)*m+(t.gravity??0),g=(Math.random()-.5)*720;l.animate([{transform:`translate(0,0) rotate(0deg) scale(.4)`,opacity:1},{transform:`translate(${ee*.8}px,${h*.7}px) rotate(${g*.8}deg) scale(1)`,opacity:1,offset:.78},{transform:`translate(${ee}px,${h}px) rotate(${g}deg) scale(.8)`,opacity:0}],{duration:o+Math.random()*(s-o),delay:(t.stagger??0)*c,easing:`cubic-bezier(.2,.7,.4,1)`,fill:`both`}).finished.then(()=>l.remove()).catch(()=>l.remove())}}function te(e,t,n){b(e,{x:t,y:n,count:22,size:e=>50+e%5*18,html:()=>`<div class="puff"></div>`,distance:[40,240],duration:[500,900]})}var x=null;function S(e){x=e}function ne(e){window.addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||(e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),o.unlock(),e.repeat||x?.(e.key===`ArrowLeft`?`left`:`right`))}),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dir]`);t&&(o.unlock(),x?.(t.dataset.dir))})}var re={tomte:`Tomtens favoriter`,pepparkaka:`Bagarens dröm`,julgran:`Hela granen`,ljus:`Elräkningen`,bajs:`Bajsparaden`,regnbage:`Hela regnbågen`,farg:`Ton i ton`,vardag:`Vardagslook`,glitter:`Silver och guld`,rymd:`Rymdäventyret`,hav:`Sju haven`,saga:`Sagans värld`,djungel:`Djungelfeber`,sport:`Mästarlaget`},ie={rymd:[`rymd`,`Rymdkläderna gör katten ännu lättare`],hav:[`hav`,`Havskläderna ger vågen extra fart`],saga:[`saga`,`Sagokläderna gör förtrollningen starkare`],djungel:[`djungel`,`Djungelkläderna gör vrålet ännu högre`]},ae=[0,0,4,8,12],oe=e=>s.map(t=>f[e[t]]),C=(e,t)=>e.filter(e=>e.themes.includes(t)).length;function se(e,t,n){let r=[],i=new Set(e.map(e=>e.id)),a=Object.keys(re).reduce((t,n)=>C(e,n)>C(e,t)?n:t),o=C(e,a);return o>=2&&r.push({name:`${re[a]} (${o} plagg)`,points:ae[o]}),e.filter(e=>e.naughty).length>=3&&r.push({name:`Totalt kaos`,points:5}),i.has(`mobildrakt`)&&i.has(`ljusskor`)&&r.push({name:`Hoppar och svarar inte`,points:3}),t>=18&&n>=12&&r.push({name:`Snygg OCH busig`,points:4}),r}function ce(e,t){let n=e.powerStyle+e.powerBus,r=t.filter(e=>e.naughty).length,i=ie[e.group];if(i)return C(t,i[0])>=1?{points:n+3,note:i[1]}:{points:n,note:null};switch(e.id){case`rosa`:return C(t,`ljus`)>=1?{points:n+3,note:`Stjärnorna gnistrar i julljusen`}:{points:n,note:null};case`gra`:return r>=2?{points:n+3,note:`Räkan luktar ännu starkare i dåligt sällskap`}:{points:n,note:null};case`gron`:return C(t,`farg`)>=1?{points:n+3,note:`Grönt på grönt, kamouflaget blev perfekt`}:{points:n,note:null};case`julgran`:return C(t,`julgran`)>=1?{points:n+2,note:`Gran på gran gör susen`}:{points:n,note:null};case`nisse`:return C(t,`tomte`)>=1?{points:n+2,note:`Tomten vill ha mer gröt`}:{points:n,note:null};case`regnbage`:return C(t,`regnbage`)>=1?{points:n+3,note:`Regnbågen matchar kläderna`}:{points:n,note:null};case`silver`:case`guld`:return C(t,`glitter`)>=1?{points:n+3,note:`Glittret matchar pälsen`}:{points:n,note:null};case`rod`:case`orange`:case`gul`:case`bla`:case`lila`:return C(t,`farg`)>=1?{points:n+3,note:`Färgbomben matchar kläderna`}:{points:n,note:null};case`svart`:case`vit`:case`tiger`:case`trefarg`:case`siames`:case`smoking`:return C(t,`vardag`)>=1?{points:n+2,note:`Vardagskläder passar en vanlig katt`}:{points:n,note:null};default:return{points:n,note:null}}}function le(e,t,n){let r=oe(t),i=r.reduce((e,t)=>e+t.style,0),a=r.reduce((e,t)=>e+t.bus,0),o=se(r,i,a),s=o.reduce((e,t)=>e+t.points,0),c=ce(e,r),l=Math.floor(n()*7);return{style:i,bus:a,combos:o,comboPoints:s,powerPoints:c.points,powerNote:c.note,cheer:l,total:i+a+s+c.points+l}}function ue(e,t=Math.random){let n=e.map(e=>le(e.cat,e.outfit,t)),r=e.map(()=>t()),i=e.map((e,t)=>t).sort((e,t)=>n[t].total-n[e].total||n[t].bus-n[e].bus||r[t]-r[e]),[a,o]=i,s=null;return o!==void 0&&n[a].total===n[o].total&&(s=n[a].bus===n[o].bus?`Exakt lika! Tomten singlade slant.`:`Lika poäng! Den busigaste katten vinner.`),{scores:n,winner:a,ranking:i,tiebreak:s}}var w=`#2b1638`,T=`stroke="#2b1638" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`,E=[`#ff4b4b`,`#ffd23f`,`#3fdc7c`,`#45b7ff`,`#ff6bd6`],D=[`#ff4b4b`,`#ff9f43`,`#ffd93d`,`#3fdc7c`,`#45a7ff`,`#9b5cff`],O={main:`#c92f36`,accent:`#ff5c5c`,trim:`#fff`};function k(e,t,n,r=0,i=1){return`<g transform="translate(${e} ${t}) rotate(${r}) scale(${i})">
    <circle class="bulb-glow" style="animation-delay:-${(e*7+t*13)%100/100}s" r="19" fill="${n}" opacity=".4"/>
    <path d="M0,-12 C9,-12 11,2 6,9 L-6,9 C-11,2 -9,-12 0,-12Z" fill="${n}" stroke="${w}" stroke-width="2.5"/>
    <rect x="-4" y="-16" width="8" height="5" rx="1" fill="#59606e" stroke="${w}" stroke-width="1.5"/>
    <ellipse cx="-3" cy="-4" rx="2" ry="3.5" fill="#fff" opacity=".75"/>
  </g>`}function A(e,t,n,r=n*.45,i=5,a=-90){let o=[];for(let s=0;s<i*2;s++){let c=s%2?r:n,l=(a+s*180/i)*Math.PI/180;o.push(`${(e+c*Math.cos(l)).toFixed(1)},${(t+c*Math.sin(l)).toFixed(1)}`)}return o.join(` `)}function j(e,t,n){return`<g transform="translate(${e} ${t})"><g class="fly" style="animation-delay:-${n}s">
    <ellipse cx="-4" cy="-5" rx="6" ry="4" fill="#fff" opacity=".8" transform="rotate(30 -4 -5)"/>
    <ellipse cx="4" cy="-5" rx="6" ry="4" fill="#fff" opacity=".8" transform="rotate(-30 4 -5)"/>
    <ellipse rx="5" ry="4" fill="${w}"/>
  </g></g>`}function M(e,t,n){return`<path class="stink" style="animation-delay:-${n}s" d="M${e},${t} q-10,-12 0,-24 q10,-12 0,-24" fill="none" stroke="#8fd14f" stroke-width="5" stroke-linecap="round" opacity=".8"/>`}var de={rymdhjalm:()=>`
    <circle cx="150" cy="124" r="112" fill="#bfe6ff" fill-opacity=".3" ${T}/>
    <path d="M70,84 Q98,30 156,22" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/>
    <path d="M214,176 Q230,152 232,126" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>
    <path d="M150,12 V-14" stroke="${w}" stroke-width="5"/>
    <circle cx="150" cy="-20" r="9" fill="#e5322d" ${T}/>
    <ellipse cx="150" cy="226" rx="82" ry="17" fill="#e9edf3" ${T}/>
    <rect x="132" y="218" width="36" height="12" rx="4" fill="#45a7ff" stroke="${w}" stroke-width="3"/>`,blackfisk:()=>`
    <g fill="none" stroke-linecap="round">
      <path d="M96,92 C74,108 66,128 50,136 M108,98 C92,126 86,156 70,176 M204,98 C208,126 214,156 230,176 M204,92 C226,108 234,128 250,136" stroke="${w}" stroke-width="24"/>
      <path d="M96,92 C74,108 66,128 50,136 M108,98 C92,126 86,156 70,176 M204,98 C208,126 214,156 230,176 M204,92 C226,108 234,128 250,136" stroke="#b05cd6" stroke-width="14"/>
    </g>
    <g fill="#e9c4f5"><circle cx="70" cy="122" r="3.5"/><circle cx="58" cy="132" r="3.5"/><circle cx="92" cy="140" r="3.5"/><circle cx="80" cy="162" r="3.5"/>
      <circle cx="230" cy="122" r="3.5"/><circle cx="242" cy="132" r="3.5"/><circle cx="210" cy="140" r="3.5"/><circle cx="220" cy="162" r="3.5"/></g>
    <path d="M84,102 C76,22 224,22 216,102 Q150,118 84,102Z" fill="#b05cd6" ${T}/>
    <circle cx="114" cy="56" r="6" fill="#d38ef0"/><circle cx="190" cy="48" r="8" fill="#d38ef0"/><circle cx="160" cy="34" r="5" fill="#d38ef0"/>
    <circle cx="128" cy="72" r="14" fill="#fff" stroke="${w}" stroke-width="3.5"/><circle cx="132" cy="75" r="6" fill="${w}"/>
    <circle cx="172" cy="72" r="14" fill="#fff" stroke="${w}" stroke-width="3.5"/><circle cx="168" cy="75" r="6" fill="${w}"/>
    <path d="M140,94 Q150,100 160,94" fill="none" stroke="${w}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M226,60 q8,-6 16,0 q-8,6 -16,0Z M236,40 q6,-4 12,0 q-6,4 -12,0Z" fill="${w}"/>`,pirathatt:()=>`
    <path d="M56,94 Q78,56 108,66 Q124,24 150,24 Q176,24 192,66 Q222,56 244,94 Q150,72 56,94Z" fill="#2b2733" ${T}/>
    <path d="M60,90 Q150,68 240,90" fill="none" stroke="#f5c518" stroke-width="5" stroke-linecap="round"/>
    <path d="M134,70 L166,54 M134,54 L166,70" stroke="${w}" stroke-width="9" stroke-linecap="round"/>
    <path d="M134,70 L166,54 M134,54 L166,70" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <circle cx="150" cy="50" r="12" fill="#fff" stroke="${w}" stroke-width="3"/>
    <rect x="144" y="57" width="12" height="8" rx="2" fill="#fff" stroke="${w}" stroke-width="2.5"/>
    <circle cx="145" cy="49" r="3" fill="${w}"/><circle cx="155" cy="49" r="3" fill="${w}"/>`,trollkarlshatt:()=>`
    <path d="M150,-52 Q160,-30 186,-34 Q170,0 200,86 L100,86 Q130,10 150,-52Z" fill="#3c3ab0" ${T}/>
    <ellipse cx="150" cy="90" rx="90" ry="16" fill="#2d2b8f" ${T}/>
    <path d="M106,70 Q150,80 194,70 L198,82 Q150,92 102,82Z" fill="#ffd23f" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="${A(146,20,11)}" fill="#ffd23f" stroke="${w}" stroke-width="2"/>
    <polygon points="${A(170,48,7)}" fill="#fff"/>
    <path d="M132,44 A10,10 0 1 0 132,62 A7,7 0 1 1 132,44Z" fill="#ffd23f"/>
    <polygon points="${A(160,-6,5,2,4,0)}" fill="#fff"/>`,safarihatt:()=>`
    <ellipse cx="150" cy="92" rx="98" ry="18" fill="#c9a96b" ${T}/>
    <path d="M88,92 C86,28 214,28 212,92 Z" fill="#dcc08a" ${T}/>
    <path d="M90,74 Q150,88 210,74 L211,86 Q150,100 89,86Z" fill="#6b4a22"/>
    <path d="M120,40 Q150,30 180,40" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>
    <circle cx="150" cy="34" r="6" fill="#c9a96b" stroke="${w}" stroke-width="3"/>
    <path d="M186,82 C196,62 214,58 224,62 C220,76 204,86 186,82Z" fill="#3fbf6f" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M188,80 L216,64" stroke="${w}" stroke-width="2"/>`,orm:()=>`
    <path d="M86,96 Q150,124 214,96 Q220,70 192,64 Q150,84 108,64 Q80,70 86,96Z" fill="#5cc85c" ${T}/>
    <path d="M108,64 Q150,84 192,64 Q198,40 176,36 Q150,50 124,36 Q102,40 108,64Z" fill="#6fd86f" ${T}/>
    <g fill="#ffd23f"><circle cx="112" cy="86" r="4"/><circle cx="150" cy="96" r="4"/><circle cx="188" cy="86" r="4"/><circle cx="136" cy="56" r="3.5"/><circle cx="166" cy="56" r="3.5"/></g>
    <path d="M150,44 Q148,24 162,18" fill="none" stroke="${w}" stroke-width="20" stroke-linecap="round"/>
    <path d="M150,44 Q148,24 162,18" fill="none" stroke="#6fd86f" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="170" cy="16" rx="24" ry="15" fill="#5cc85c" ${T}/>
    <circle cx="170" cy="9" r="4.5" fill="#fff" stroke="${w}" stroke-width="2"/><circle cx="171" cy="9" r="2.2" fill="${w}"/>
    <path d="M193,18 h14 l6,-5 M207,18 l6,5" fill="none" stroke="#e5322d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,svettband:()=>`
    <path d="M78,96 Q150,66 222,96 L220,114 Q150,84 80,114Z" fill="#fff" ${T}/>
    <path d="M79,105 Q150,75 221,105" fill="none" stroke="#e5322d" stroke-width="6"/>
    <path d="M222,104 q20,4 24,22 M222,108 q14,10 12,28" fill="none" stroke="${w}" stroke-width="12" stroke-linecap="round"/>
    <path d="M222,104 q20,4 24,22 M222,108 q14,10 12,28" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,guldkrona:()=>`
    <path d="M88,92 L80,24 L116,56 L150,8 L184,56 L220,24 L212,92 Z" fill="#f5c518" ${T}/>
    <path d="M100,80 L96,46 M150,30 V70 M200,80 L204,46" stroke="#fff3b0" stroke-width="5" stroke-linecap="round" opacity=".8"/>
    <rect x="84" y="76" width="132" height="22" rx="7" fill="#d9a400" ${T}/>
    <circle cx="80" cy="22" r="7" fill="#fff3b0" stroke="${w}" stroke-width="3"/>
    <circle cx="150" cy="6" r="8" fill="#fff3b0" stroke="${w}" stroke-width="3"/>
    <circle cx="220" cy="22" r="7" fill="#fff3b0" stroke="${w}" stroke-width="3"/>
    <path d="M150,40 l10,12 l-10,12 l-10,-12 Z" fill="#e5322d" stroke="${w}" stroke-width="3"/>
    <circle cx="110" cy="87" r="6" fill="#45a7ff" stroke="${w}" stroke-width="2.5"/>
    <circle cx="150" cy="87" r="6" fill="#3fdc7c" stroke="${w}" stroke-width="2.5"/>
    <circle cx="190" cy="87" r="6" fill="#ff6bd6" stroke="${w}" stroke-width="2.5"/>`,keps:()=>`
    <path d="M86,94 C84,32 216,32 214,94 Z" fill="#2a7de1" ${T}/>
    <path d="M150,40 V92 M116,48 Q110,70 112,92 M184,48 Q190,70 188,92" fill="none" stroke="#1d5bb0" stroke-width="4" stroke-linecap="round"/>
    <circle cx="150" cy="38" r="7" fill="#1d5bb0" ${T}/>
    <polygon points="${A(150,70,13)}" fill="#fff"/>
    <path d="M80,92 Q150,128 220,92 Q150,104 80,92Z" fill="#1d5bb0" ${T}/>`,solglasogon:()=>`
    <path d="M80,120 L98,122 M220,120 L202,122" stroke="${w}" stroke-width="6" stroke-linecap="round"/>
    <path d="M96,112 Q122,106 146,114 Q148,142 124,146 Q98,146 96,112Z" fill="#1c1b2e" ${T}/>
    <path d="M204,112 Q178,106 154,114 Q152,142 176,146 Q202,146 204,112Z" fill="#1c1b2e" ${T}/>
    <path d="M144,116 Q150,110 156,116" fill="none" stroke="${w}" stroke-width="6" stroke-linecap="round"/>
    <path d="M104,124 l14,-10 M110,134 l20,-16 M162,124 l14,-10 M168,134 l20,-16" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>`,luciakrona:()=>`${[[96,40],[122,24],[150,12],[178,24],[204,40]].map(([e,t],n)=>`
      <circle class="bulb-glow" style="animation-delay:-${n*.23}s" cx="${e}" cy="${t-12}" r="17" fill="#ffe67a" opacity=".5"/>
      <rect x="${e-7}" y="${t}" width="14" height="${86-t}" rx="3" fill="#fffdf4" ${T}/>
      <path d="M${e},${t} v-5" stroke="${w}" stroke-width="2.5"/>
      <path d="M${e},${t-26} C${e+10},${t-14} ${e+8},${t-5} ${e},${t-5} C${e-8},${t-5} ${e-10},${t-14} ${e},${t-26}Z" fill="#ffd23f" stroke="${w}" stroke-width="2.5"/>
      <path d="M${e},${t-17} C${e+4},${t-11} ${e+3},${t-8} ${e},${t-8} C${e-3},${t-8} ${e-4},${t-11} ${e},${t-17}Z" fill="#ff8a00"/>`).join(``)}<ellipse cx="150" cy="86" rx="76" ry="15" fill="#1d7a45" ${T}/>${[84,104,124,144,164,184,204].map((e,t)=>`<ellipse cx="${e+6}" cy="${84+(t%2?4:-3)}" rx="13" ry="7" transform="rotate(${t%2?20:-20} ${e+6} ${84+(t%2?4:-3)})" fill="#2f9c5e" stroke="${w}" stroke-width="3"/>`).join(``)}${[92,118,146,174,200,214].map((e,t)=>`<circle cx="${e}" cy="${88+t%2*4}" r="5.5" fill="#e5322d" stroke="${w}" stroke-width="2"/>`).join(``)}`,kastrull:()=>`
    <path d="M206,44 L276,30" stroke="${w}" stroke-width="20" stroke-linecap="round"/>
    <path d="M206,44 L276,30" stroke="#3a3a4a" stroke-width="10" stroke-linecap="round"/>
    <path d="M94,90 L102,14 Q150,0 198,14 L206,90 Z" fill="#b9c2cf" ${T}/>
    <ellipse cx="150" cy="14" rx="48" ry="10" fill="#d5dbe4" ${T}/>
    <path d="M114,30 L110,80 M186,30 L190,80" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/>
    <path d="M150,40 l-8,10 l10,4" fill="none" stroke="${w}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <rect x="86" y="84" width="128" height="16" rx="8" fill="#9aa4b4" ${T}/>
    <path d="M100,98 q-2,14 4,20 q6,-4 2,-20 M196,98 q-2,10 4,16 q6,-4 1,-16 M150,100 q-3,8 2,11 q5,-3 2,-11" fill="#fff6e0" stroke="${w}" stroke-width="2.5"/>
    <circle cx="232" cy="48" r="4" fill="#fff6e0" stroke="${w}" stroke-width="2"/>`,fargmossa:e=>`
    <path d="M82,92 C80,30 112,4 150,4 C188,4 220,30 218,92 Z" fill="${e.main}" ${T}/>
    <path d="M118,84 C114,52 124,26 140,12 M182,84 C186,52 176,26 160,12 M150,86 V10" fill="none" stroke="${e.accent}" stroke-width="5" stroke-linecap="round" opacity=".75"/>
    <path d="M90,58 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10 l12,-10 l12,10" fill="none" stroke="${e.trim}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="76" y="70" width="148" height="32" rx="16" fill="${e.accent}" ${T}/>
    <path d="M98,76 v20 M114,75 v22 M130,75 v22 M146,75 v22 M162,75 v22 M178,75 v22 M194,75 v22 M208,77 v18" stroke="${e.main}" stroke-width="4" stroke-linecap="round" opacity=".55"/>
    <circle cx="150" cy="-2" r="25" fill="${e.trim}" ${T}/>
    <path d="M136,-10 q6,-6 12,0 M152,4 q6,-6 12,0 M140,10 q4,-4 8,0" fill="none" stroke="${e.accent}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>`,tomteluva:()=>`
    <path d="M90,84 C98,18 150,-30 208,-24 C238,-20 254,2 258,30 C240,10 222,12 208,22 C218,44 212,66 212,84 Z" fill="#e5322d" ${T}/>
    <path d="M118,60 C128,30 150,4 180,-8" fill="none" stroke="#ff7a6b" stroke-width="6" stroke-linecap="round"/>
    <rect x="78" y="66" width="144" height="32" rx="16" fill="#fff" ${T}/>
    <circle cx="260" cy="38" r="20" fill="#fff" ${T}/>`,pepparkakshatt:()=>`
    <ellipse cx="150" cy="84" rx="92" ry="19" fill="#a9602a" ${T}/>
    <path d="M100,80 L106,-2 Q150,-16 194,-2 L200,80 Q150,94 100,80Z" fill="#c07a38" ${T}/>
    <path d="M104,62 l12,-12 l12,12 l12,-12 l11,12 l11,-12 l12,12 l11,-12 l11,12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="150" cy="-4" rx="44" ry="11" fill="#d8924b" ${T}/>
    <path d="M115,-5 q8,5 16,0 t16,0 t16,0 t16,0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="125" cy="30" r="9" fill="#e5322d" ${T}/>
    <circle cx="150" cy="24" r="9" fill="#2fbf71" ${T}/>
    <circle cx="175" cy="30" r="9" fill="#ffd23f" ${T}/>`,renoron:()=>`
    <g fill="none" stroke-linecap="round">
      <path d="M112,76 C100,40 84,20 70,-12 M92,36 C74,34 62,28 48,12 M82,14 C92,6 100,-4 104,-22" stroke="${w}" stroke-width="17"/>
      <path d="M112,76 C100,40 84,20 70,-12 M92,36 C74,34 62,28 48,12 M82,14 C92,6 100,-4 104,-22" stroke="#c98d50" stroke-width="9"/>
      <path d="M188,76 C200,40 216,20 230,-12 M208,36 C226,34 238,28 252,12 M218,14 C208,6 200,-4 196,-22" stroke="${w}" stroke-width="17"/>
      <path d="M188,76 C200,40 216,20 230,-12 M208,36 C226,34 238,28 252,12 M218,14 C208,6 200,-4 196,-22" stroke="#c98d50" stroke-width="9"/>
    </g>
    <ellipse cx="62" cy="96" rx="32" ry="16" transform="rotate(24 62 96)" fill="#a8703b" ${T}/>
    <ellipse cx="62" cy="96" rx="17" ry="7" transform="rotate(24 62 96)" fill="#f5c4a5"/>
    <ellipse cx="238" cy="96" rx="32" ry="16" transform="rotate(-24 238 96)" fill="#a8703b" ${T}/>
    <ellipse cx="238" cy="96" rx="17" ry="7" transform="rotate(-24 238 96)" fill="#f5c4a5"/>
    <circle cx="150" cy="152" r="23" fill="#ff5a4d" opacity=".35" class="bulb-glow"/>
    <circle cx="150" cy="152" r="13" fill="#e5322d" ${T}/>
    <circle cx="146" cy="148" r="3.5" fill="#fff"/>`,"julljus-hatt":()=>`
    <path d="M72,92 Q150,10 228,92" fill="none" stroke="#14532d" stroke-width="7" stroke-linecap="round"/>
    <path d="M98,62 Q150,-22 202,62" fill="none" stroke="#14532d" stroke-width="6" stroke-linecap="round"/>
    ${[[112,20,-18],[150,8,0],[188,20,18]].map(([e,t,n],r)=>k(e,t-6,E[(r+2)%5],n)).join(``)}
    ${[[78,84,-60],[98,60,-42],[124,46,-20],[150,42,0],[176,46,20],[202,60,42],[222,84,60]].map(([e,t,n],r)=>k(e,t-8,E[r%5],n)).join(``)}`,soptunna:()=>`
    <path d="M86,92 L100,4 L200,4 L214,92 Q150,108 86,92Z" fill="#7d8796" ${T}/>
    <path d="M118,12 L112,88 M150,12 L150,94 M182,12 L188,88" stroke="${w}" stroke-width="4" opacity=".5"/>
    <path d="M196,6 q18,-26 40,-20 M218,-2 l10,-14 M208,-8 l6,-14 M226,-8 l12,-8" fill="none" stroke="#f4f0dc" stroke-width="6" stroke-linecap="round"/>
    <path d="M236,-14 l16,-8 l-2,20 Z" fill="#f4f0dc" ${T}/>
    <path d="M112,6 C100,-20 90,-14 78,-30" fill="none" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/>
    <g class="bin-lid">
      <path d="M86,4 Q150,-34 214,-6 L216,6 Q150,-18 84,16Z" fill="#a0aaba" ${T}/>
      <path d="M134,-20 q16,-18 34,-2" fill="none" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
    </g>
    ${j(64,26,0)}${j(238,40,.8)}`,bajshatt:()=>`
    <path d="M150,-42 C168,-30 178,-20 172,-8 C188,-6 196,14 182,24 C214,28 224,58 204,72 C226,78 230,104 196,104 L104,104 C70,104 74,78 96,72 C76,58 86,28 118,24 C104,14 116,-8 130,-6 C124,-18 134,-30 150,-42Z" fill="#7a4a21" ${T}/>
    <path d="M104,76 C130,88 170,88 196,76 M120,28 C136,38 164,38 180,28 M130,-4 C140,2 160,2 170,-4" fill="none" stroke="#5a3415" stroke-width="5" stroke-linecap="round"/>
    <path d="M100,62 C102,52 110,46 120,44 M124,14 C126,8 130,6 136,4" fill="none" stroke="#a87038" stroke-width="5" stroke-linecap="round"/>
    <circle cx="134" cy="52" r="9" fill="#fff" ${T}/><circle cx="136" cy="54" r="3.5" fill="${w}"/>
    <circle cx="166" cy="52" r="9" fill="#fff" ${T}/><circle cx="168" cy="54" r="3.5" fill="${w}"/>
    <path d="M140,68 q10,8 20,0" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round"/>
    ${M(66,40,0)}${M(236,30,.6)}${j(48,66,.3)}${j(250,70,1.1)}`,regnbagshatt:()=>{let e=D.map((e,t)=>{let n=86-t*11;return`<path d="M${150-n},96 A${n},${n} 0 0 1 ${150+n},96" fill="none" stroke="${e}" stroke-width="12"/>`}).join(``),t=e=>`
      <g stroke="${w}" stroke-width="10"><circle cx="${e-20}" cy="98" r="16"/><circle cx="${e}" cy="88" r="21"/><circle cx="${e+20}" cy="98" r="16"/></g>
      <g fill="#fff"><circle cx="${e-20}" cy="98" r="16"/><circle cx="${e}" cy="88" r="21"/><circle cx="${e+20}" cy="98" r="16"/></g>`;return`<path d="M93.5,96 A56.5,56.5 0 0 1 206.5,96" fill="none" stroke="${w}" stroke-width="76"/>
      ${e}${t(93)}${t(207)}`}},N=`M108,190 Q150,176 192,190 L206,298 Q150,332 94,298 Z`,P=e=>[108-(e-190)*14/108,192+(e-190)*14/108],fe={rymddrakt:()=>({sleeve:`#eef1f6`,cuff:`#45a7ff`,body:`
      <path d="${N}" fill="#eef1f6" ${T}/>
      <rect x="122" y="222" width="56" height="40" rx="6" fill="#59606e" ${T}/>
      <circle cx="137" cy="235" r="5.5" fill="#e5322d" stroke="${w}" stroke-width="2"/>
      <circle cx="151" cy="235" r="5.5" fill="#ffd23f" stroke="${w}" stroke-width="2"/>
      <circle cx="165" cy="235" r="5.5" fill="#3fdc7c" stroke="${w}" stroke-width="2"/>
      <rect x="131" y="247" width="38" height="7" rx="3" fill="#45a7ff"/>
      <path d="M100,284 Q150,304 200,284" fill="none" stroke="#45a7ff" stroke-width="8"/>
      <polygon points="${A(186,210,9)}" fill="#ffd23f" stroke="${w}" stroke-width="2"/>
      <path d="M114,206 h14 v10 h-14 Z" fill="#45a7ff" stroke="${w}" stroke-width="2"/>`}),piratrock:()=>({sleeve:`#c4262e`,cuff:`#f5c518`,body:`
      <path d="${N}" fill="#c4262e"/>
      <path d="M128,188 L150,244 L172,188 Z" fill="#fff"/>
      <path d="M136,200 q7,6 14,0 q7,6 14,0 M140,214 q5,5 10,0 q5,5 10,0" fill="none" stroke="#d8d0c0" stroke-width="3"/>
      <path d="M150,244 L150,312" stroke="${w}" stroke-width="3"/>
      ${[[138,258],[138,280],[162,258],[162,280]].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="5" fill="#f5c518" stroke="${w}" stroke-width="2.5"/>`).join(``)}
      <path d="M97,288 Q150,306 203,288 L205,300 Q150,318 95,300Z" fill="#3a2a1a"/>
      <rect x="140" y="292" width="20" height="16" rx="3" fill="none" stroke="#f5c518" stroke-width="4"/>
      <path d="${N}" fill="none" ${T}/>`}),prinsessklanning:()=>({sleeve:`#ffb3d9`,cuff:`#fff`,body:`
      <path d="${N}" fill="#ff9fd0" ${T}/>
      <path d="M104,250 Q150,264 196,250 L234,336 Q150,362 66,336 Z" fill="#ffb3d9" ${T}/>
      <path d="M122,262 L102,340 M150,266 L150,350 M178,262 L198,340" stroke="#ff8ac4" stroke-width="4"/>
      <path d="M70,330 Q150,356 230,330" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>
      <path d="M106,252 Q150,266 194,252" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      ${[120,135,150,165,180].map(e=>`<circle cx="${e}" cy="${196+Math.abs(e-150)*-.2+6}" r="4.5" fill="#fff" stroke="${w}" stroke-width="1.5"/>`).join(``)}
      <path d="M150,236 C138,226 132,218 138,212 C143,208 148,211 150,216 C152,211 157,208 162,212 C168,218 162,226 150,236Z" fill="#e5322d" stroke="${w}" stroke-width="2.5"/>
      <polygon points="${A(98,300,6,2.5,4,0)}" fill="#fff"/><polygon points="${A(204,296,6,2.5,4,0)}" fill="#fff"/>`}),lovdrakt:()=>({sleeve:`#3fbf6f`,cuff:`#2e9a52`,body:`
        <path d="${N}" fill="#2e9a52" ${T}/>
        ${[200,226,252,278].flatMap((e,t)=>{let[n,r]=P(e);return Array.from({length:5},(i,a)=>{let o=n+8+(r-n-16)*(a+t%2*.5)/4.5,s=(a+t)%2?`#3fbf6f`:`#2e9a52`;return`<path d="M${o.toFixed(1)},${e} q-12,16 0,32 q12,-16 0,-32Z" fill="${s}" stroke="${w}" stroke-width="2.5"/><path d="M${o.toFixed(1)},${e+4} v24" stroke="#1d6b38" stroke-width="2"/>`})}).join(``)}
        <path d="${N}" fill="none" ${T}/>
        ${[0,72,144,216,288].map(e=>`<ellipse cx="180" cy="204" rx="7" ry="12" transform="rotate(${e} 180 214)" fill="#ff5fa2" stroke="${w}" stroke-width="2"/>`).join(``)}
        <circle cx="180" cy="214" r="5" fill="#ffd23f" stroke="${w}" stroke-width="2"/>`}),fotbollstroja:()=>({sleeve:`#ff7a1a`,cuff:`#fff`,body:`
      <path d="${N}" fill="#ff7a1a" ${T}/>
      <path d="M100,226 L200,226 M98,240 L202,240" stroke="#fff" stroke-width="5" opacity=".0"/>
      <path d="M126,188 Q150,208 174,188" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
      <text x="150" y="282" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="56" fill="#fff" stroke="${w}" stroke-width="4" paint-order="stroke">10</text>
      <polygon points="${A(124,212,7)}" fill="#ffd23f" stroke="${w}" stroke-width="1.5"/>`}),silverkavaj:()=>({sleeve:`#c9d1dc`,cuff:`#f5c518`,body:`
      <path d="${N}" fill="#cfd6e0"/>
      <path d="M126,188 L150,254 L174,188 Z" fill="#fff"/>
      <path d="M124,188 L150,254 L138,256 L110,202 Z M176,188 L150,254 L162,256 L190,202 Z" fill="#8a95a6" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>
      ${[[114,236],[188,244],[120,288],[182,290],[104,266],[196,270]].map(([e,t])=>`<polygon points="${A(e,t,7,2.5,4,0)}" fill="#fff"/>`).join(``)}
      <circle cx="150" cy="270" r="5" fill="#f5c518" stroke="${w}" stroke-width="2.5"/>
      <circle cx="150" cy="290" r="5" fill="#f5c518" stroke="${w}" stroke-width="2.5"/>
      <path d="${N}" fill="none" ${T}/>
      <path d="M150,200 L130,188 L130,212 Z M150,200 L170,188 L170,212 Z" fill="#f5c518" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="150" cy="200" r="6" fill="#d9a400" stroke="${w}" stroke-width="3"/>`}),hoodie:()=>({sleeve:`#3fb8af`,cuff:`#2a8f87`,body:`
      <path d="${N}" fill="#3fb8af" ${T}/>
      <path d="M116,262 L184,262 L194,300 Q150,314 106,300 Z" fill="#35a39b" ${T}/>
      <path d="M118,300 L124,274 M182,300 L176,274" stroke="${w}" stroke-width="3" opacity=".5"/>
      <path d="M96,298 Q150,326 204,298 L206,304 Q150,334 94,304Z" fill="#2a8f87"/>
      <ellipse cx="150" cy="192" rx="60" ry="17" fill="#2a8f87" ${T}/>
      <path d="M138,200 L134,240 M162,200 L166,240" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="134" cy="243" r="4" fill="#fff" stroke="${w}" stroke-width="2"/><circle cx="166" cy="243" r="4" fill="#fff" stroke="${w}" stroke-width="2"/>`}),randig:()=>({sleeve:`#fff`,cuff:`#1f3a8a`,body:`
        <path d="${N}" fill="#fff"/>
        ${[206,232,258,284].map(e=>{let[t,n]=P(e),[r,i]=P(e+12);return`<path d="M${t},${e} L${n},${e} L${i},${e+12} L${r},${e+12}Z" fill="#1f3a8a"/>`}).join(``)}
        <path d="${N}" fill="none" ${T}/>
        <path d="M126,188 Q150,206 174,188" fill="none" stroke="#1f3a8a" stroke-width="7" stroke-linecap="round"/>
        <circle cx="178" cy="226" r="9" fill="#e5322d" stroke="${w}" stroke-width="3"/>`}),julklappsdrakt:()=>({sleeve:`#e5322d`,cuff:`#ffd23f`,body:`
      <rect x="90" y="184" width="120" height="140" rx="10" fill="#e5322d" ${T}/>
      <path d="M98,200 l10,10 M98,240 l10,10 M98,284 l10,10 M192,206 l10,10 M192,262 l10,10" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>
      <rect x="139" y="184" width="22" height="140" fill="#ffd23f" stroke="${w}" stroke-width="4"/>
      <rect x="90" y="242" width="120" height="20" fill="#ffd23f" stroke="${w}" stroke-width="4"/>
      <path d="M150,252 C126,226 106,236 116,252 C106,268 126,276 150,252 C174,276 194,268 184,252 C194,236 174,226 150,252Z" fill="#ffd23f" ${T}/>
      <circle cx="150" cy="252" r="9" fill="#ffb800" ${T}/>
      <path d="M180,286 l18,18" stroke="${w}" stroke-width="2.5"/>
      <rect x="186" y="296" width="30" height="18" rx="3" transform="rotate(20 201 305)" fill="#fffdf4" stroke="${w}" stroke-width="3"/>`}),kalsonger:()=>({sleeve:null,cuff:null,body:`
      <path d="${N}" fill="#f5f2ea" ${T}/>
      <path d="M124,190 Q150,214 176,190" fill="none" stroke="${w}" stroke-width="4"/>
      <path d="M120,226 C126,214 140,218 138,228 C146,230 144,242 134,240 C128,248 116,242 120,234 C112,232 114,224 120,226Z" fill="#c9a24a" opacity=".85"/>
      <path d="M160,248 C164,242 172,244 170,250 C176,252 172,258 166,256 C162,260 156,256 160,252Z" fill="#8a5527" opacity=".7"/>
      <path d="M91,272 L209,272 L214,318 Q182,330 152,316 Q148,316 148,316 Q118,330 86,318 Z" fill="#ff6fae" ${T}/>
      <rect x="88" y="264" width="124" height="16" rx="6" fill="#fff" ${T}/>
      <path d="M150,282 V314" stroke="${w}" stroke-width="3"/>
      ${[[110,296],[132,304],[172,296],[192,306],[118,314]].map(([e,t])=>`<path d="M${e},${t+6} c-7,-5 -7,-11 -2,-11 c2,0 2,2 2,3 c0,-1 0,-3 2,-3 c5,0 5,6 -2,11Z" fill="#fff"/>`).join(``)}
      ${M(64,250,.3)}${j(244,230,.6)}`}),fargtroja:e=>({sleeve:e.main,cuff:e.accent,body:`
      <path d="${N}" fill="${e.main}"/>
      <path d="M95,286 Q150,316 205,286 L206,298 Q150,332 94,298 Z" fill="${e.accent}"/>
      <path d="M108,296 v12 M122,300 v14 M136,303 v15 M150,304 v16 M164,303 v15 M178,300 v14 M192,296 v12" stroke="${e.main}" stroke-width="3.5" stroke-linecap="round" opacity=".6"/>
      <path d="M104,214 l4,8 l4,-8 M188,214 l4,8 l4,-8 M102,262 l4,8 l4,-8 M190,262 l4,8 l4,-8" fill="none" stroke="${e.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150,280 C120,262 110,240 124,229 C136,220 147,227 150,236 C153,227 164,220 176,229 C190,240 180,262 150,280Z" fill="${e.trim}" ${T}/>
      <path d="M130,236 q4,-6 10,-4" fill="none" stroke="${e.accent}" stroke-width="4" stroke-linecap="round"/>
      <path d="${N}" fill="none" ${T}/>
      <ellipse cx="150" cy="192" rx="44" ry="11" fill="${e.accent}" ${T}/>`}),regnbagstroja:()=>{let e=[208,226,244,262,280,298],t=e.slice(0,-1).map((t,n)=>{let r=e[n+1],[i,a]=P(t),[o,s]=P(r);return`<path d="M${i},${t} L${a},${t} L${s},${r} L${o},${r}Z" fill="${D[n+1]}"/>`}).join(``),[n,r]=P(208);return{sleeve:`#45a7ff`,cuff:`#ffd93d`,body:`
        <path d="${N}" fill="${D[5]}"/>
        <path d="M108,190 Q150,176 192,190 L${r},208 L${n},208Z" fill="${D[0]}"/>
        ${t}
        <path d="${N}" fill="none" ${T}/>
        <ellipse cx="150" cy="192" rx="40" ry="10" fill="#fff" ${T}/>`}},tomtedrakt:()=>({sleeve:`#e5322d`,cuff:`#fff`,body:`
      <path d="${N}" fill="#e5322d" ${T}/>
      <rect x="138" y="190" width="24" height="124" fill="#fff"/>
      <rect x="90" y="298" width="120" height="26" rx="13" fill="#fff" ${T}/>
      <rect x="96" y="250" width="108" height="20" fill="#2b1638"/>
      <rect x="133" y="244" width="34" height="32" rx="5" fill="#ffd23f" ${T}/>
      <rect x="143" y="254" width="14" height="12" fill="#2b1638"/>
      <ellipse cx="150" cy="192" rx="52" ry="14" fill="#fff" ${T}/>`}),pepparkaksdrakt:()=>({sleeve:`#b5692e`,cuff:`#fff`,body:`
      <path d="${N}" fill="#b5692e" ${T}/>
      <path d="M102,284 l12,12 l12,-10 l12,12 l12,-10 l12,10 l12,-12 l12,10 l12,-12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M116,200 q8,8 17,2 t17,0 t17,0 t17,-2" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      <circle cx="150" cy="226" r="9" fill="#e5322d" ${T}/>
      <circle cx="150" cy="252" r="9" fill="#2fbf71" ${T}/>
      <circle cx="150" cy="278" r="9" fill="#ffd23f" ${T}/>`}),julgransdrakt:()=>({sleeve:`#178a4d`,cuff:`#ffd23f`,body:`
      <path d="M150,226 L240,330 Q150,350 60,330 Z" fill="#178a4d" ${T}/>
      <path d="M150,198 L222,284 Q150,304 78,284 Z" fill="#1fa35d" ${T}/>
      <path d="M150,172 L204,236 Q150,254 96,236 Z" fill="#2cc06f" ${T}/>
      <path d="M92,298 Q150,322 208,298 M106,250 Q150,270 194,250" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 11"/>
      <circle cx="90" cy="322" r="10" fill="#e5322d" ${T}/>
      <circle cx="150" cy="332" r="10" fill="#45b7ff" ${T}/>
      <circle cx="210" cy="322" r="10" fill="#ffd23f" ${T}/>
      <circle cx="118" cy="276" r="9" fill="#ff6bd6" ${T}/>
      <circle cx="182" cy="276" r="9" fill="#e5322d" ${T}/>
      <circle cx="150" cy="238" r="8" fill="#ffd23f" ${T}/>`}),bajskorvdrakt:()=>({sleeve:`#7a4a21`,cuff:`#5a3415`,body:`
      <rect x="78" y="288" width="144" height="42" rx="21" fill="#7a4a21" ${T}/>
      <rect x="86" y="252" width="128" height="42" rx="21" fill="#8a5527" ${T}/>
      <rect x="92" y="216" width="116" height="42" rx="21" fill="#7a4a21" ${T}/>
      <rect x="100" y="182" width="100" height="40" rx="20" fill="#8a5527" ${T}/>
      <path d="M100,268 h26 M104,232 h22 M92,304 h30 M170,274 h24" stroke="#b57e45" stroke-width="5" stroke-linecap="round"/>
      ${M(62,280,.2)}${M(240,262,.9)}${j(52,226,.5)}${j(252,206,1.4)}`}),ljusdrakt:()=>({sleeve:`#26307a`,cuff:`#ffd23f`,body:`
      <path d="${N}" fill="#26307a" ${T}/>
      <path d="M112,204 L140,220 L168,206 L192,224 L188,258 L160,246 L132,258 L106,244 L104,288 L134,298 L166,296 L196,284" fill="none" stroke="#0e5230" stroke-width="5" stroke-linejoin="round"/>
      ${[[112,208],[140,224],[168,210],[192,228],[188,262],[160,250],[132,262],[106,248],[104,292],[134,302],[166,300],[196,288]].map(([e,t],n)=>k(e,t+6,E[n%5],n%3*14-14,.95)).join(``)}`}),mobildrakt:()=>({sleeve:null,cuff:null,body:`
      <g class="phone-g">
        <rect x="84" y="176" width="132" height="158" rx="20" fill="#1c1b2e" ${T}/>
        <rect x="94" y="192" width="112" height="126" rx="8" fill="#38d39f" class="phone-screen"/>
        <rect x="134" y="182" width="32" height="5" rx="2.5" fill="#54546f"/>
        <circle cx="150" cy="222" r="20" fill="#fff"/>
        <circle cx="150" cy="216" r="7" fill="#e5322d"/>
        <path d="M137,237 q13,-16 26,0 Z" fill="#e5322d"/>
        <text x="150" y="263" text-anchor="middle" font-family="'Baloo 2',Verdana,sans-serif" font-weight="800" font-size="21" fill="#10352a">MAMMA</text>
        <text x="150" y="279" text-anchor="middle" font-family="'Baloo 2',Verdana,sans-serif" font-weight="700" font-size="13" fill="#10352a">ringer…</text>
        <circle cx="122" cy="299" r="12" fill="#e5322d" stroke="#10352a" stroke-width="2.5"/>
        <circle cx="178" cy="299" r="12" fill="#14a04f" stroke="#10352a" stroke-width="2.5"/>
        <path d="M116,299 h12 M172,296 q6,8 12,6" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      </g>`})};function pe(e){return`<path d="M${e-30},404 Q${e-32},376 ${e},376 Q${e+32},376 ${e+30},404 Z" fill="#b5692e" ${T}/>
    <path d="M${e-22},394 l7,-7 l7,7 l8,-7 l7,7 l7,-7 l7,7" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${e}" cy="378" r="5" fill="#e5322d" stroke="${w}" stroke-width="2.5"/>`}function me(e){return`<path d="M${e-32},406 L${e},356 L${e+32},406 Q${e},414 ${e-32},406Z" fill="#1fa35d" ${T}/>
    <circle cx="${e-12}" cy="396" r="5.5" fill="#e5322d" stroke="${w}" stroke-width="2.5"/>
    <circle cx="${e+12}" cy="396" r="5.5" fill="#ffd23f" stroke="${w}" stroke-width="2.5"/>
    <circle cx="${e}" cy="378" r="5.5" fill="#45b7ff" stroke="${w}" stroke-width="2.5"/>`}function he(e,t){return`<path d="M${e-22},360 L${e+22},360 L${e+24},384 Q${e+t*44},384 ${e+t*40},406 L${e-t*26},406 Q${e-t*30},384 ${e-t*22},380 Z" fill="#e5322d" ${T}/>
    <rect x="${e-26}" y="352" width="52" height="18" rx="9" fill="#fff" ${T}/>
    <circle cx="${e+t*2}" cy="382" r="6" fill="#ffd23f" stroke="${w}" stroke-width="3"/>`}function ge(e){return`<path d="M${e-30},406 Q${e-31},380 ${e-10},376 L${e+12},376 Q${e+31},382 ${e+31},406 Z" fill="#fff" ${T}/>
    ${D.slice(0,3).map((t,n)=>`<path d="M${e-18+n*12},400 l8,-18" stroke="${t}" stroke-width="5" stroke-linecap="round"/>`).join(``)}
    <rect x="${e-32}" y="400" width="64" height="9" rx="4.5" fill="${D[5]}" stroke="${w}" stroke-width="3.5"/>`}function _e(e,t,n){return`<path d="M${e-22},354 L${e+22},354 L${e+23},384 Q${e+t*42},384 ${e+t*38},406 L${e-t*26},406 Q${e-t*29},386 ${e-t*22},380 Z" fill="${n.main}" ${T}/>
    <path d="M${e-t*22},403 L${e+t*34},403" stroke="${n.accent}" stroke-width="5" stroke-linecap="round"/>
    <rect x="${e-26}" y="346" width="52" height="18" rx="9" fill="${n.accent}" ${T}/>
    <path d="M${e-9},372 l9,5 l9,-5 M${e-9},382 l9,5 l9,-5" fill="none" stroke="${n.trim}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`}function ve(e){return`<path d="M${e-26},386 Q${e-28},356 ${e},354 Q${e+28},356 ${e+26},386 Z" fill="#a8703b" ${T}/>
    <path d="M${e-18},362 q4,-6 10,-2 M${e+6},360 q6,-4 10,2" fill="none" stroke="#fff3e0" stroke-width="4" stroke-linecap="round"/>
    <rect x="${e-25}" y="366" width="50" height="9" rx="4" fill="#e5322d" stroke="${w}" stroke-width="3"/>
    <circle cx="${e}" cy="378" r="6" fill="#ffd23f" stroke="${w}" stroke-width="2.5"/>
    <path d="M${e-26},384 L${e-2},384 L${e-3},408 L${e-28},408 Z M${e+2},384 L${e+26},384 L${e+28},408 L${e+3},408 Z" fill="#3a2a22" ${T}/>`}function ye(e,t){let n=t*10;return`<path d="M${e-14},372 Q${e},366 ${e+14},372 L${e+38+n},412 Q${e+26+n},420 ${e+14+n},412 Q${e+n},422 ${e-12+n},412 Q${e-26+n},420 ${e-38+n},412 Z" fill="#22c4a1" ${T}/>
    <path d="M${e-6},380 L${e-22+n},410 M${e},380 L${e+n},414 M${e+6},380 L${e+22+n},410" stroke="#11806a" stroke-width="4" stroke-linecap="round"/>
    <rect x="${e-18}" y="362" width="36" height="16" rx="8" fill="#ffd23f" ${T}/>`}function be(e){let t=e=>`<path d="${e}" fill="#ffe14d" ${T}/>`;return`${t(`M${e-14},384 C${e-30},380 ${e-44},392 ${e-46},404 C${e-34},404 ${e-22},398 ${e-12},394 Z`)}
    ${t(`M${e+14},384 C${e+30},380 ${e+44},392 ${e+46},404 C${e+34},404 ${e+22},398 ${e+12},394 Z`)}
    <path d="M${e-24},406 Q${e-26},378 ${e},374 Q${e+26},378 ${e+24},406 Z" fill="#fff6c2" ${T}/>
    ${t(`M${e-8},390 C${e-12},366 ${e-4},352 ${e},346 C${e+4},352 ${e+12},366 ${e+8},390 Z`)}
    <circle cx="${e}" cy="348" r="3.5" fill="#5a3415"/><circle cx="${e-45}" cy="403" r="3" fill="#5a3415"/><circle cx="${e+45}" cy="403" r="3" fill="#5a3415"/>
    <path d="M${e-8},398 h4 M${e+4},394 h3" stroke="#c9a24a" stroke-width="3" stroke-linecap="round"/>`}function xe(e,t){return`<path d="M${e-26},404 Q${e-28},374 ${e-6},370 L${e+8},370 Q${e+t*30},378 ${e+t*32},404 Z" fill="#e5322d" ${T}/>
    <path d="M${e-26},398 L${e+30},398" stroke="#fff" stroke-width="8"/>
    <rect x="${e-30}" y="400" width="62" height="9" rx="4.5" fill="#fff" stroke="${w}" stroke-width="3.5"/>
    <path d="M${e-8},378 l14,4 M${e-8},386 l14,-4 M${e-8},392 l14,0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="${e+t*20}" cy="394" rx="9" ry="5" fill="#fff" stroke="${w}" stroke-width="2.5"/>`}function Se(e,t){return`<path d="M${e-22},340 L${e+22},340 L${e+23},384 Q${e+t*40},384 ${e+t*36},406 L${e-t*26},406 Q${e-t*28},386 ${e-t*22},380 Z" fill="#ffd23f" ${T}/>
    <rect x="${e-25}" y="334" width="50" height="12" rx="5" fill="#f2a900" ${T}/>
    <path d="M${e-12},352 v26" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
    <path d="M${e-t*26},404 L${e+t*36},404" stroke="#3a3a4a" stroke-width="5" stroke-linecap="round"/>`}function Ce(e,t){return`<rect x="${e+t*14-5}" y="396" width="10" height="16" rx="2" fill="#b07d0a" stroke="${w}" stroke-width="3"/>
    <path d="M${e-26},404 Q${e-28},378 ${e},374 Q${e+28},378 ${e+26},404 Z" fill="#f5c518" ${T}/>
    <path d="M${e-16},388 Q${e-8},380 ${e+2},380" fill="none" stroke="#fff3b0" stroke-width="4" stroke-linecap="round"/>
    <polygon points="${A(e,390,8,3.5,4,0)}" fill="#fff" stroke="${w}" stroke-width="1.5"/>`}function F(e){return`<g class="rocket-flame"><path d="M${e-14},406 Q${e},458 ${e+14},406 Z" fill="#ffb020" stroke="${w}" stroke-width="3"/>
    <path d="M${e-7},406 Q${e},436 ${e+7},406 Z" fill="#fff3b0"/></g>
    <path d="M${e-22},392 L${e-36},410 L${e-20},406 Z M${e+22},392 L${e+36},410 L${e+20},406 Z" fill="#e5322d" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M${e-22},406 L${e-22},372 Q${e},352 ${e+22},372 L${e+22},406 Z" fill="#e9edf3" ${T}/>
    <rect x="${e-22}" y="388" width="44" height="8" fill="#e5322d"/>
    <rect x="${e-15}" y="402" width="30" height="9" rx="3" fill="#59606e" stroke="${w}" stroke-width="3"/>
    <circle cx="${e}" cy="377" r="5.5" fill="#45a7ff" stroke="${w}" stroke-width="2.5"/>`}function we(e){let t=[[e-20,398,15],[e,388,20],[e+20,398,15],[e-8,404,12],[e+10,404,12]];return`<g stroke="${w}" stroke-width="10">${t.map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="${n}"/>`).join(``)}</g>
    <g fill="#fff">${t.map(([e,t,n])=>`<circle cx="${e}" cy="${t}" r="${n}"/>`).join(``)}</g>
    <path d="M${e-12},384 q6,-6 14,-4" fill="none" stroke="#dfe9f5" stroke-width="4" stroke-linecap="round"/>
    <polygon points="${A(e+26,378,7,2.5,4,0)}" fill="#ffd93d"/>`}function Te(e){return`<ellipse class="bulb-glow" cx="${e}" cy="392" rx="42" ry="34" fill="#ffb020" opacity=".45"/>
    <path d="${Array.from({length:10},(t,n)=>{let r=n/10*Math.PI*2;return`M${(e+Math.cos(r)*26).toFixed(1)},${(392+Math.sin(r)*20).toFixed(1)} L${(e+Math.cos(r)*36).toFixed(1)},${(392+Math.sin(r)*28).toFixed(1)}`}).join(` `)}" stroke="#ff8a00" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="${e}" cy="392" rx="25" ry="19" fill="#ffd23f" ${T}/>
    <circle cx="${e-8}" cy="388" r="2.5" fill="${w}"/><circle cx="${e+8}" cy="388" r="2.5" fill="${w}"/>
    <path d="M${e-8},396 q8,7 16,0" fill="none" stroke="${w}" stroke-width="2.5" stroke-linecap="round"/>`}function Ee(e,t){return`<path d="M${e-22},340 L${e+22},340 L${e+23},384 Q${e+t*40},384 ${e+t*36},406 L${e-t*26},406 Q${e-t*28},386 ${e-t*22},380 Z" fill="#dfe6f0" ${T}/>
    <path d="M${e-21},358 h42 M${e-21},372 h42" stroke="#aab4c6" stroke-width="4"/>
    <rect x="${e-26}" y="334" width="52" height="12" rx="6" fill="#9aa6bd" ${T}/>
    <path d="M${e-t*26},404 L${e+t*36},404" stroke="#45a7ff" stroke-width="6" stroke-linecap="round"/>
    <polygon points="${A(e,364,7)}" fill="#ffd23f" stroke="${w}" stroke-width="1.5"/>`}function De(e){let t=[-22,-11,0,11,22].map(t=>`M${e},404 L${e+t},${374+Math.abs(t)*.5}`).join(` `);return`<path d="M${e-28},404 Q${e-30},370 ${e},366 Q${e+30},370 ${e+28},404 Z" fill="#ffc2d4" ${T}/>
    <path d="${t}" stroke="#e98aa8" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M${e-10},404 Q${e},396 ${e+10},404 Z" fill="#ffa6c0" stroke="${w}" stroke-width="3"/>
    <circle cx="${e+18}" cy="384" r="5" fill="#fff" stroke="${w}" stroke-width="2"/>`}function I(e,t){return`<rect x="${e+t*14-5}" y="396" width="10" height="16" rx="2" fill="#bfe6ff" stroke="${w}" stroke-width="3"/>
    <path d="M${e-26},404 Q${e-28},378 ${e},374 Q${e+28},378 ${e+26},404 Z" fill="#dff4ff" fill-opacity=".85" ${T}/>
    <path d="M${e-16},390 Q${e-8},382 ${e+2},382" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <polygon points="${A(e+12,388,8,3,4,0)}" fill="#fff" stroke="${w}" stroke-width="1.5"/>`}function L(e){return`<path d="M${e-28},404 Q${e-30},368 ${e},366 Q${e+30},368 ${e+28},404 Z" fill="#7a4a24" ${T}/>
    <path d="M${e-16},376 l-4,-5 M${e-4},372 l-2,-6 M${e+8},372 l2,-6 M${e+18},378 l5,-4 M${e-22},388 l-6,-2 M${e+22},390 l6,-2" stroke="#4a2a12" stroke-width="3" stroke-linecap="round"/>
    <path d="M${e-27},402 L${e+27},402" stroke="#fff6e3" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${e-7}" cy="384" r="3" fill="#3a2010"/><circle cx="${e+5}" cy="384" r="3" fill="#3a2010"/><circle cx="${e-1}" cy="392" r="3" fill="#3a2010"/>`}function Oe(e,t){return`${[-18,-4,10,24].map(n=>`<rect x="${e+t*n-4}" y="403" width="8" height="8" rx="2" fill="#bfc6d2" stroke="${w}" stroke-width="2.5"/>`).join(``)}<path d="M${e-26},404 Q${e-28},374 ${e-6},370 L${e+8},370 Q${e+t*30},378 ${e+t*32},404 Z" fill="#2b2733" ${T}/>
    <path d="M${e-18},388 L${e+t*22},392" stroke="#3fdc7c" stroke-width="5" stroke-linecap="round"/>
    <path d="M${e-8},378 l12,3 M${e-8},385 l12,-2" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`}function ke(e){return`<path d="M${e-24},406 Q${e-26},378 ${e},378 Q${e+26},378 ${e+24},406 Z" fill="#26307a" ${T}/>
    ${k(e-2,396,E[Math.abs(e)%5],0,.7)}`}function Ae(e,t,n,r=O){switch(e){case`fargskor`:return _e(t,n,r);case`renhovar`:return ve(t);case`maanskor`:return Ee(t,n);case`snackskor`:return De(t);case`glasskor`:return I(t,n);case`kokosskor`:return L(t);case`fotbollsskor`:return Oe(t,n);case`guldskor`:return Ce(t,n);case`raketskor`:return F(t);case`molnskor`:return we(t);case`solskor`:return Te(t);case`gympaskor`:return xe(t,n);case`gummistovlar`:return Se(t,n);case`simfotter`:return ye(t,n);case`bananskal`:return be(t);case`pepparkaksskor`:return pe(t);case`julgransskor`:return me(t);case`tomteskor`:return he(t,n);case`ljusskor`:return ke(t);case`regnbagsskor`:return ge(t);default:return``}}var je=`
  <path d="M116,330 Q150,350 184,330 Q150,316 116,330 M122,356 Q150,376 178,356 Q150,342 122,356" fill="none" stroke="#14532d" stroke-width="6" stroke-linecap="round"/>
  ${k(120,336,E[0],-30,.8)}${k(150,348,E[1],0,.8)}${k(180,336,E[2],30,.8)}
  ${k(126,362,E[3],-30,.8)}${k(150,374,E[4],0,.8)}${k(174,362,E[0],30,.8)}`,Me=[[[190,295],[250,320],[300,290],[285,230]],[[285,230],[278,200],[262,195],[265,170]]],Ne=`M190,295 C250,320 300,290 285,230 C278,200 262,195 265,170`;function R(e){let t=e<.7?Me[0]:Me[1],n=e<.7?e/.7:(e-.7)/.3,r=1-n,i=[r*r*r,3*r*r*n,3*r*n*n,n*n*n];return[0,1].map(e=>t.reduce((t,n,r)=>t+n[e]*i[r],0))}function Pe(e,t,n,r=13){return`<path d="M${e},${t-r-16} L${e},${t-r}" stroke="${w}" stroke-width="3"/>
    <rect x="${e-4}" y="${t-r-5}" width="8" height="6" rx="1.5" fill="#ffd23f" stroke="${w}" stroke-width="2"/>
    <circle cx="${e}" cy="${t}" r="${r}" fill="${n}" ${T}/>
    <path d="M${e-r+4},${t} q${r-4},7 ${2*r-8},0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <circle cx="${e-r/3}" cy="${t-r/3}" r="3" fill="#fff" opacity=".9"/>`}var Fe={planetring:()=>{let[e,t]=R(1),n=e+4,r=t-28,i=e=>`<g transform="rotate(-18 ${n} ${r})">
      <path d="M${n-44},${r} A44,11 0 0 ${e} ${n+44},${r}" fill="none" stroke="${w}" stroke-width="12" stroke-linecap="round"/>
      <path d="M${n-44},${r} A44,11 0 0 ${e} ${n+44},${r}" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/></g>`;return`${i(1)}
      <circle cx="${n}" cy="${r}" r="24" fill="#ff9f43" ${T}/>
      <path d="M${n-22},${r-7} Q${n},${r-2} ${n+22},${r-7} M${n-20},${r+9} Q${n},${r+14} ${n+20},${r+9}" fill="none" stroke="#e0782d" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${n-9}" cy="${r-10}" r="4" fill="#fff" opacity=".7"/>
      ${i(0)}`},papegoja:()=>{let[e,t]=R(1);return`<g transform="translate(${e} ${t-2})">
      <path d="M-6,-8 L-22,30 L-2,24 Z" fill="#45a7ff" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="0" cy="-28" rx="17" ry="24" fill="#e5322d" ${T}/>
      <path d="M-12,-34 Q-28,-12 -8,-4 Q-2,-20 -12,-34Z" fill="#3fdc7c" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="4" cy="-50" r="14" fill="#e5322d" ${T}/>
      <circle cx="8" cy="-53" r="5" fill="#fff" stroke="${w}" stroke-width="2"/><circle cx="9" cy="-53" r="2.3" fill="${w}"/>
      <path d="M15,-52 Q30,-48 18,-38 Z" fill="#ffd23f" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M-6,-2 l-3,8 M6,-2 l3,8" stroke="#ffb020" stroke-width="3.5" stroke-linecap="round"/>
    </g>`},trollstav:()=>{let[e,t]=R(1);return`<path d="M${e-4},${t+12} L${e+22},${t-50}" stroke="${w}" stroke-width="13" stroke-linecap="round"/>
      <path d="M${e-4},${t+12} L${e+22},${t-50}" stroke="#5a3b8a" stroke-width="6" stroke-linecap="round"/>
      <polygon points="${A(e+25,t-60,21)}" fill="#ffd23f" ${T}/>
      <polygon points="${A(e+54,t-76,7,2.5,4,0)}" fill="#fff"/>
      <polygon points="${A(e+2,t-86,6,2.5,4,0)}" fill="#fff"/>
      <polygon points="${A(e+52,t-36,5,2,4,0)}" fill="#ffd23f"/>`},apa:()=>{let[e,t]=R(1),n=e+34,r=t+30;return`<path d="M${e+2},${t-4} Q${n+4},${t-14} ${n+4},${r-14}" fill="none" stroke="${w}" stroke-width="12" stroke-linecap="round"/>
      <path d="M${e+2},${t-4} Q${n+4},${t-14} ${n+4},${r-14}" fill="none" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
      <path d="M${n-4},${r+44} q22,12 18,-12 q-4,-9 -11,-3" fill="none" stroke="${w}" stroke-width="10" stroke-linecap="round"/>
      <path d="M${n-4},${r+44} q22,12 18,-12 q-4,-9 -11,-3" fill="none" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="${n}" cy="${r+32}" rx="14" ry="18" fill="#8a5a2b" ${T}/>
      <ellipse cx="${n}" cy="${r+34}" rx="8" ry="11" fill="#e8c9a0"/>
      <circle cx="${n-17}" cy="${r-2}" r="7" fill="#e8c9a0" stroke="${w}" stroke-width="3"/><circle cx="${n+17}" cy="${r-2}" r="7" fill="#e8c9a0" stroke="${w}" stroke-width="3"/>
      <circle cx="${n}" cy="${r}" r="17" fill="#8a5a2b" ${T}/>
      <ellipse cx="${n}" cy="${r+5}" rx="12" ry="10" fill="#e8c9a0"/>
      <circle cx="${n-5}" cy="${r-3}" r="2.8" fill="${w}"/><circle cx="${n+5}" cy="${r-3}" r="2.8" fill="${w}"/>
      <path d="M${n-6},${r+7} q6,6 12,0" fill="#e5322d" stroke="${w}" stroke-width="2"/>`},pompom:()=>{let[e,t]=R(1),n=Array.from({length:20},(n,r)=>{let i=r/20*Math.PI*2,a=28+r%3*5;return`M${e},${t} L${(e+Math.cos(i)*a).toFixed(1)},${(t+Math.sin(i)*a).toFixed(1)}`}),r=(e,t)=>`<path d="${e.join(` `)}" stroke="${w}" stroke-width="9" stroke-linecap="round"/><path d="${e.join(` `)}" stroke="${t}" stroke-width="5" stroke-linecap="round"/>`;return r(n.filter((e,t)=>t%2==0),`#ff4f8b`)+r(n.filter((e,t)=>t%2==1),`#fff`)+`<circle cx="${e}" cy="${t}" r="7" fill="#ffd23f" stroke="${w}" stroke-width="3"/>`},glitterboa:()=>{let e=Array.from({length:13},(e,t)=>.1+t*.075);return e.map((t,n)=>{let[r,i]=R(t);return`<circle cx="${r.toFixed(1)}" cy="${i.toFixed(1)}" r="${n===e.length-1?19:15}" fill="${n%2?`#e9edf3`:`#c3ccd8`}" stroke="${w}" stroke-width="3"/>`}).join(``)+[.25,.55,.85].map(e=>{let[t,n]=R(e);return`<polygon points="${A(t+4,n-4,7,2.5,4,0)}" fill="#fff"/>`}).join(``)},ballong:()=>{let[e,t]=R(1),n=e+34,r=t-120;return`<path d="M${e},${t} C${e+24},${t-30} ${e+8},${t-60} ${n},${r+38}" fill="none" stroke="${w}" stroke-width="2.5"/>
      <path d="M${n-6},${r+44} L${n},${r+34} L${n+6},${r+44} Z" fill="#e8304f" stroke="${w}" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="${n}" cy="${r}" rx="32" ry="38" fill="#ff4b6e" ${T}/>
      <ellipse cx="${n-11}" cy="${r-14}" rx="7" ry="12" transform="rotate(25 ${n-11} ${r-14})" fill="#fff" opacity=".7"/>`},harsnodd:()=>{let[e,t]=R(.82),n=Array.from({length:9},(n,r)=>{let i=r/9*Math.PI*2;return`<circle cx="${(e+Math.cos(i)*18).toFixed(1)}" cy="${(t+Math.sin(i)*9).toFixed(1)}" r="10" fill="${r%2?`#ff8fc8`:`#ff6fb5`}" stroke="${w}" stroke-width="3"/>`});return`${n.filter((e,t)=>Math.sin(t/9*Math.PI*2)<0).join(``)}${n.filter((e,t)=>Math.sin(t/9*Math.PI*2)>=0).join(``)}<circle cx="${e-8}" cy="${t+6}" r="2.5" fill="#fff"/><circle cx="${e+10}" cy="${t+8}" r="2.5" fill="#fff"/>`},julstrumpa:()=>{let[e,t]=R(1);return`<path d="M${e-6},${t+14} L${e-6},${t-22} Q${e-6},${t-36} ${e+7},${t-36} Q${e+20},${t-36} ${e+20},${t-23}" fill="none" stroke="${w}" stroke-width="13" stroke-linecap="round"/>
      <path d="M${e-6},${t+14} L${e-6},${t-22} Q${e-6},${t-36} ${e+7},${t-36} Q${e+20},${t-36} ${e+20},${t-23}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <path d="M${e-6},${t+10} L${e-6},${t-22} Q${e-6},${t-36} ${e+7},${t-36} Q${e+20},${t-36} ${e+20},${t-23}" fill="none" stroke="#e5322d" stroke-width="7" stroke-dasharray="5 6"/>
      <path d="M${e-16},${t+12} L${e+16},${t+12} L${e+16},${t+50} Q${e+16},${t+62} ${e+30},${t+62} L${e+38},${t+62} Q${e+52},${t+70} ${e+40},${t+82} L${e+4},${t+82} Q${e-16},${t+82} ${e-16},${t+62} Z" fill="#e5322d" ${T}/>
      <path d="M${e-16},${t+40} L${e+16},${t+40}" stroke="#fff" stroke-width="5"/>
      <path d="M${e+30},${t+82} Q${e+46},${t+76} ${e+42},${t+64}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <rect x="${e-20}" y="${t+2}" width="40" height="16" rx="8" fill="#fff" ${T}/>`},fiskben:()=>{let[e,t]=R(1),n=[10,22,34,46].map(n=>`M${e+n},${t-12} q-4,12 0,24`).join(` `);return`<path d="M${e-2},${t} L${e+58},${t}" stroke="${w}" stroke-width="9" stroke-linecap="round"/>
      <path d="M${e-2},${t} L${e+58},${t}" stroke="#f1ead8" stroke-width="4" stroke-linecap="round"/>
      <path d="${n}" fill="none" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
      <path d="${n}" fill="none" stroke="#f1ead8" stroke-width="3" stroke-linecap="round"/>
      <path d="M${e+4},${t} L${e-16},${t-16} L${e-12},${t} L${e-16},${t+16} Z" fill="#f1ead8" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M${e+56},${t-18} Q${e+90},${t-14} ${e+92},${t} Q${e+90},${t+14} ${e+56},${t+18} Z" fill="#c6ccd6" ${T}/>
      <path d="M${e+72},${t-8} l6,6 m0,-6 l-6,6" stroke="${w}" stroke-width="3" stroke-linecap="round"/>
      <path d="M${e+84},${t+6} q-4,3 -8,0" fill="none" stroke="${w}" stroke-width="2.5" stroke-linecap="round"/>
      ${M(e+30,t-18,.2)}${j(e+22,t-54,.4)}${j(e+80,t-40,1.2)}`},toapapper:()=>{let[e,t]=R(1);return`<path d="M${e+14},${t+10} C${e+40},${t+70} ${e-10},${t+120} ${e+20},${t+170} C${e+40},${t+205} ${e-10},${t+222} ${e-40},${t+230}" fill="none" stroke="${w}" stroke-width="32" stroke-linecap="round"/>
      <path d="M${e+14},${t+10} C${e+40},${t+70} ${e-10},${t+120} ${e+20},${t+170} C${e+40},${t+205} ${e-10},${t+222} ${e-40},${t+230}" fill="none" stroke="#fffdf8" stroke-width="22" stroke-linecap="round"/>
      <path d="M${e+14},${t+10} C${e+40},${t+70} ${e-10},${t+120} ${e+20},${t+170} C${e+40},${t+205} ${e-10},${t+222} ${e-40},${t+230}" fill="none" stroke="#c9cfd9" stroke-width="22" stroke-dasharray="2 26"/>
      <rect x="${e-22}" y="${t-20}" width="44" height="34" rx="6" fill="#fffdf8" ${T}/>
      <ellipse cx="${e-22}" cy="${t-3}" rx="7" ry="17" fill="#fffdf8" ${T}/>
      <ellipse cx="${e-22}" cy="${t-3}" rx="3" ry="8" fill="#b08a5a"/>`},fargrosett:e=>{let[t,n]=R(1),r=r=>`<path d="M${t},${n} C${t+r*30},${n-40} ${t+r*56},${n-6} ${t+r*46},${n+12} C${t+r*36},${n+28} ${t+r*12},${n+12} ${t},${n}Z" fill="${e.main}" ${T}/>
       <circle cx="${t+r*34}" cy="${n-6}" r="4" fill="${e.trim}"/><circle cx="${t+r*24}" cy="${n+10}" r="3.5" fill="${e.trim}"/>`;return`<path d="M${t-4},${n+6} L${t-22},${n+50} L${t-10},${n+44} L${t-4},${n+56} L${t+4},${n+8} Z" fill="${e.accent}" ${T}/>
      <path d="M${t+4},${n+6} L${t+16},${n+52} L${t+24},${n+42} L${t+32},${n+50} L${t+8},${n+4} Z" fill="${e.accent}" ${T}/>
      ${r(-1)}${r(1)}
      <ellipse cx="${t}" cy="${n+2}" rx="12" ry="11" fill="${e.accent}" ${T}/>`},regnbagssvans:()=>{let[e,t]=R(1),n=D.map((n,r)=>{let i=t-14+r*6;return`<path class="ribbon" style="animation-delay:-${r*.12}s" d="M${e},${i} q16,-16 32,-4 t32,-4" fill="none" stroke="${n}" stroke-width="6" stroke-linecap="round"/>`}).join(``);return`<path d="M${e},${t-18} q16,-16 32,-4 t32,-4 v38 q-16,12 -32,4 t-32,4Z" fill="${w}" opacity=".9"/>${n}
      <circle cx="${e}" cy="${t}" r="10" fill="#fff" ${T}/>`},julkulor:()=>[[.22,`#e5322d`],[.42,`#ffd23f`],[.6,`#45b7ff`],[.8,`#ff6bd6`],[1,`#e5322d`]].map(([e,t])=>{let[n,r]=R(e);return Pe(n,r+28,t)}).join(``),pepparkakssmulor:()=>{let[e,t]=R(1);return`${[[0,.2],[14,.7],[-12,1.2],[8,1.7],[-6,.45],[18,1.05]].map(([n,r])=>`<g transform="translate(${e+n} ${t+26})"><rect class="crumb" style="animation-delay:-${r}s" x="-4" y="-4" width="${6+n%3}" height="7" rx="2" fill="#b5692e" stroke="${w}" stroke-width="2"/></g>`).join(``)}
      <polygon points="${A(e,t-8,30,19,8)}" fill="#c07a38" ${T}/>
      <circle cx="${e}" cy="${t-8}" r="13" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="3 7" stroke-linecap="round"/>`},julstjarna:()=>{let[e,t]=R(1);return`<circle class="bulb-glow" cx="${e}" cy="${t-14}" r="54" fill="#ffe67a" opacity=".4"/>
      <polygon points="${A(e,t-14,44,18)}" fill="#ffd23f" ${T}/>
      <polygon points="${A(e,t-14,22,9)}" fill="#fff3b0"/>`},"julljus-svans":()=>[.08,.24,.4,.56,.72,.88,1].map((e,t)=>{let[n,r]=R(e);return k(n+(t%2?14:-14),r+(t%2?6:-4),E[t%5],t%2?40:-40,.9)}).join(``)},Ie=(e,t=O)=>e&&de[e]?de[e](t):``,Le=(e,t=O)=>e&&fe[e]?fe[e](t):null,Re=(e,t=O)=>e&&Fe[e]?Fe[e](t):``,z=`stroke="${w}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`,ze=e=>e.id===`panda`?e.furDark:e.fur;function Be(e,t,n){return`<path d="${e}" fill="none" stroke="${w}" stroke-width="${n+10}" stroke-linecap="round"/>
    <path d="${e}" fill="none" stroke="${t}" stroke-width="${n}" stroke-linecap="round"/>`}function Ve(e,t){return`<path d="M${e-27},400 C${e-29},380 ${e-14},376 ${e},376 C${e+14},376 ${e+29},380 ${e+27},400 Q${e},408 ${e-27},400Z" fill="${ze(t)}" ${z}/>
    <path d="M${e-10},402 v-8 M${e},404 v-9 M${e+10},402 v-8" stroke="${w}" stroke-width="3" stroke-linecap="round"/>`}function He(e,t,n,r){let i=n===`ljusskor`,a=e===`l`?-1:1,o=150+a*28,s=150+a*(i?15:32),c=n?Ae(n,s,a,r):Ve(s,t);return`<g class="leg-${e}">${Be(`M${o},300 L${s},382`,ze(t),30)}${c}</g>`}function Ue(e,t,n,r){let i=t=>e===`l`?t:300-t,a=`M${i(108)},205 Q${i(82)},235 ${i(72)},275`,o=n?`<path d="${a}" pathLength="1" stroke-dasharray=".66 1" fill="none" stroke="${n}" stroke-width="26" stroke-linecap="round"/>
       ${r?`<ellipse cx="${i(81)}" cy="248" rx="19" ry="9" transform="rotate(${e===`l`?20:-20} ${i(81)} 248)" fill="${r}" ${z}/>`:``}`:``,s=`<ellipse cx="${i(72)}" cy="281" rx="16" ry="14" fill="${ze(t)}" ${z}/>
    <path d="M${i(66)},292 v-6 M${i(74)},294 v-6" stroke="${w}" stroke-width="2.5" stroke-linecap="round"/>`;return`<g class="arm-${e}">${Be(a,ze(t),26)}${o}${s}</g>`}function We(e){let t=e.id===`julgran`?14:24,n=e.id===`siames`||e.id===`panda`?e.furDark:e.fur,r=r=>`
    <path d="M${r(80)},118 C${r(72)},86 ${r(66)},56 ${r(70)},${t} C${r(96)},34 ${r(122)},54 ${r(140)},80 Z" fill="${n}" ${z}/>
    <path d="M${r(88)},100 C${r(84)},78 ${r(80)},58 ${r(82)},${t+18} C${r(100)},50 ${r(114)},62 ${r(126)},78 Z" fill="${e.innerEar}"/>
    <path d="M${r(90)},96 L${r(104)},84 M${r(88)},84 L${r(100)},74 M${r(96)},104 L${r(110)},94" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>`;return r(e=>e)+r(e=>300-e)}function Ge(e){let t=e.id===`julgran`?`<path d="M84,108 L58,100 L78,124 L50,130 L80,146 L60,164 L96,166 M216,108 L242,100 L222,124 L250,130 L220,146 L240,164 L204,166" fill="${e.fur}" ${z}/>`:``,n=e.id===`regnbage`?`#ffffff`:e.furDark;return`${t}
    <path d="M150,70 C190,70 218,92 222,124 C224,136 228,144 240,152 C228,156 224,160 230,170 C218,170 210,174 204,180 C190,194 172,200 150,200 C128,200 110,194 96,180 C90,174 82,170 70,170 C76,160 72,156 60,152 C72,144 76,136 78,124 C82,92 110,70 150,70Z" fill="${e.fur}" ${z}/>
    <path d="M84,138 l12,5 M82,148 l13,2 M216,138 l-12,5 M218,148 l-13,2" stroke="${n}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>`}function Ke(e){switch(e.id){case`rosa`:return`<polygon points="${A(92,150,10)}" fill="#fff" opacity=".9"/><polygon points="${A(208,150,10)}" fill="#fff" opacity=".9"/>`;case`gra`:return`<path d="M150,70 v22 M128,74 l5,18 M172,74 l-5,18" stroke="${e.furDark}" stroke-width="7" stroke-linecap="round"/>
        <path d="M78,120 h16 M222,120 h-16" stroke="${e.furDark}" stroke-width="6" stroke-linecap="round"/>`;case`gron`:return`<g fill="${e.furDark}"><circle cx="120" cy="86" r="6"/><circle cx="178" cy="82" r="8"/><circle cx="150" cy="96" r="4"/><circle cx="90" cy="130" r="5"/><circle cx="212" cy="134" r="6"/></g>`;case`julgran`:return`<polygon points="${A(150,90,15)}" fill="#ffd23f" ${z}/>
        <circle cx="94" cy="154" r="8" fill="#e5322d" stroke="${w}" stroke-width="3"/>
        <circle cx="206" cy="154" r="8" fill="#45b7ff" stroke="${w}" stroke-width="3"/>`;case`nisse`:return`<path d="M104,102 q16,-10 32,0 M164,102 q16,-10 32,0" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`;case`regnbage`:return`<polygon points="${A(150,88,13,5,4,0)}" fill="#fff"/>
        <polygon points="${A(88,160,9,3.5,4,0)}" fill="#fff"/><polygon points="${A(212,160,9,3.5,4,0)}" fill="#fff"/>`;case`silver`:return`<polygon points="${A(150,90,13,5,6)}" fill="#fff"/>
        <polygon points="${A(90,160,8,3,4,0)}" fill="#fff"/><polygon points="${A(210,160,8,3,4,0)}" fill="#fff"/>`;case`guld`:return`<polygon points="${A(150,90,14,4,4,0)}" fill="#fff"/>
        <circle cx="128" cy="96" r="3" fill="#fff"/><circle cx="172" cy="96" r="3" fill="#fff"/>`;case`rod`:return`<path d="M150,104 C138,96 132,88 138,82 C143,78 148,81 150,86 C152,81 157,78 162,82 C168,88 162,96 150,104Z" fill="#fff" opacity=".95"/>`;case`orange`:return`<path d="M150,72 v20 M130,76 l6,16 M170,76 l-6,16" stroke="${e.furDark}" stroke-width="7" stroke-linecap="round"/>
        <path d="M78,124 h16 M80,136 h13 M222,124 h-16 M220,136 h-13" stroke="${e.furDark}" stroke-width="6" stroke-linecap="round"/>`;case`gul`:return`<circle cx="150" cy="90" r="8" fill="#fff"/>
        <path d="M150,74 v-4 M150,106 v4 M134,90 h-4 M166,90 h4 M139,79 l-3,-3 M161,79 l3,-3 M139,101 l-3,3 M161,101 l3,3" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`;case`bla`:return`<g stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M150,76 v28 M138,83 l24,14 M162,83 l-24,14"/>
        <path d="M146,78 l4,4 l4,-4 M146,102 l4,-4 l4,4" fill="none" stroke-width="3"/></g>`;case`lila`:return`<path d="M156,76 A15,15 0 1 0 156,104 A11,11 0 1 1 156,76Z" fill="#fff" opacity=".95"/>
        <polygon points="${A(166,84,6,2.5,4,0)}" fill="#fff"/>`;case`svart`:return``;case`vit`:return`<path d="M100,96 q6,-6 14,-4 M186,92 q8,-2 14,4" fill="none" stroke="${e.furDark}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;case`tiger`:return`<path d="M150,72 v22 M132,74 l6,18 M168,74 l-6,18 M116,82 l8,12 M184,82 l-8,12" stroke="${e.furDark}" stroke-width="6" stroke-linecap="round"/>
        <path d="M78,124 h18 M80,136 h15 M222,124 h-18 M220,136 h-15 M88,170 l12,-6 M212,170 l-12,-6" stroke="${e.furDark}" stroke-width="5.5" stroke-linecap="round"/>`;case`trefarg`:return`<path d="M96,84 C112,70 140,72 146,92 C150,110 132,120 114,116 C96,112 82,100 96,84Z" fill="#f0943a"/>
        <path d="M176,76 C198,74 216,92 218,114 C218,128 204,132 192,122 C180,112 160,104 162,90 C164,82 168,78 176,76Z" fill="#3e3a45"/>
        <path d="M206,160 C214,156 224,160 224,168 C216,176 206,174 206,160Z" fill="#f0943a"/>`;case`siames`:return`<ellipse cx="150" cy="160" rx="50" ry="40" fill="${e.furDark}" opacity=".85"/>
        <ellipse cx="150" cy="128" rx="34" ry="30" fill="${e.furDark}" opacity=".35"/>`;case`smoking`:return`<path d="M150,92 C142,108 130,134 118,168 C126,198 174,198 182,168 C170,134 158,108 150,92Z" fill="#fff"/>`;case`astronaut`:return`<circle cx="150" cy="88" r="10" fill="#ff9f43" stroke="${w}" stroke-width="2.5"/>
        <ellipse cx="150" cy="88" rx="19" ry="5" fill="none" stroke="#45a7ff" stroke-width="3.5" transform="rotate(-15 150 88)"/>`;case`mane`:return`<g fill="${e.furDark}" opacity=".5"><circle cx="120" cy="88" r="9"/><circle cx="182" cy="92" r="6"/><circle cx="94" cy="150" r="5"/><circle cx="206" cy="148" r="7"/><circle cx="160" cy="80" r="4"/></g>
        <polygon points="${A(150,98,7,3)}" fill="#ffd23f"/>`;case`stjarn`:return`<polygon points="${A(150,88,11)}" fill="#ffd23f"/>
        <polygon points="${A(118,98,5)}" fill="#ffd23f"/><polygon points="${A(184,98,5)}" fill="#ffd23f"/>
        <polygon points="${A(92,152,6)}" fill="#fff"/><polygon points="${A(208,152,6)}" fill="#fff"/>`;case`pirat`:return`<path d="M120,82 l12,22 M118,96 l14,-6" stroke="${e.furDark}" stroke-width="5" stroke-linecap="round"/>`;case`sjojungfru`:return`<g fill="none" stroke="${e.furDark}" stroke-width="3.5" stroke-linecap="round">
          <path d="M126,98 a8,8 0 0 0 16,0 M142,98 a8,8 0 0 0 16,0 M158,98 a8,8 0 0 0 16,0 M134,86 a8,8 0 0 0 16,0 M150,86 a8,8 0 0 0 16,0"/></g>
        <circle cx="92" cy="152" r="6" fill="#fff" stroke="${w}" stroke-width="2"/><circle cx="208" cy="152" r="6" fill="#fff" stroke="${w}" stroke-width="2"/>`;case`sjoman`:return`<g stroke="${e.furDark}" stroke-width="4.5" fill="none" stroke-linecap="round"><circle cx="150" cy="80" r="4"/>
        <path d="M150,84 V106 M142,90 H158 M138,98 Q140,108 150,108 Q160,108 162,98"/></g>`;case`prinsessa`:return`<path d="M92,160 C84,154 82,148 86,145 C89,143 92,145 92,148 C92,145 95,143 98,145 C102,148 100,154 92,160Z" fill="#ff6fae"/>
        <path d="M208,160 C200,154 198,148 202,145 C205,143 208,145 208,148 C208,145 211,143 214,145 C218,148 216,154 208,160Z" fill="#ff6fae"/>`;case`trollkarl`:return`<polygon points="${A(150,86,12,3.5,4,0)}" fill="#fff"/>
        <polygon points="${A(126,98,5,2,4,0)}" fill="#ffd23f"/><polygon points="${A(174,98,5,2,4,0)}" fill="#ffd23f"/>
        <path d="M136,186 Q150,226 164,186 Z" fill="#e3e0ef" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>`;case`enhorning`:return`<path d="M136,90 L150,-4 L164,90 Z" fill="#ffd23f" ${z}/>
        <path d="M139,74 L160,64 M142,52 L157,44 M145,30 L154,25" stroke="#e9a400" stroke-width="4" stroke-linecap="round"/>
        <path d="M118,74 q-8,-14 4,-22 M126,72 q-2,-16 12,-20" fill="none" stroke="#ff8ac4" stroke-width="7" stroke-linecap="round"/>
        <path d="M182,74 q8,-14 -4,-22 M174,72 q2,-16 -12,-20" fill="none" stroke="#8ad1ff" stroke-width="7" stroke-linecap="round"/>`;case`lejon`:return`<path d="M136,80 q14,-10 28,0" fill="none" stroke="${e.furDark}" stroke-width="5" stroke-linecap="round"/>`;case`leopard`:return[[118,86],[150,80],[182,88],[92,140],[208,140],[104,166],[196,166],[134,100],[166,100]].map(([t,n],r)=>`<circle cx="${t}" cy="${n}" r="${r>6?5:7}" fill="#d9952e" stroke="${e.furDark}" stroke-width="3.5" stroke-dasharray="7 4"/>`).join(``);case`panda`:return`<ellipse cx="120" cy="130" rx="25" ry="20" transform="rotate(-25 120 130)" fill="${e.furDark}"/>
        <ellipse cx="180" cy="130" rx="25" ry="20" transform="rotate(25 180 130)" fill="${e.furDark}"/>`}}var qe=0,Je={regnbage:[`#ff5a5a`,`#ff9f43`,`#ffd93d`,`#5be37d`,`#4fb3ff`,`#a66bff`],silver:[`#f7f9fc`,`#b4bdcb`,`#eef1f6`,`#949fb2`,`#e3e8ef`,`#a7b1c1`],guld:[`#fff3b0`,`#efbb26`,`#ffe479`,`#cf9410`,`#f8d548`,`#c98d0c`]};function Ye(e){let t=Je[e];if(!t)return null;qe+=1;let n=`fur-grad-${qe}`;return{id:n,defs:`<defs><linearGradient id="${n}" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="0" y2="410">
      ${t.map((e,n)=>`<stop offset="${(n/(t.length-1)).toFixed(2)}" stop-color="${e}"/>`).join(``)}
    </linearGradient></defs>`}}function Xe(e){if(e.id!==`lejon`)return``;let t=Array.from({length:16},(e,t)=>{let n=t/16*Math.PI*2;return[150+Math.cos(n)*92,140+Math.sin(n)*82,t%2?30:26]}),n=(e,n)=>t.map(([t,r,i])=>`<circle cx="${t.toFixed(1)}" cy="${r.toFixed(1)}" r="${i+n}" fill="${e}"/>`).join(``);return`${n(w,5)}${n(e.furDark,0)}<circle cx="150" cy="140" r="96" fill="#d98a2b"/>`}var Ze=`<path d="M90,96 Q140,98 168,116 M190,120 Q214,128 226,142" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="178" cy="127" rx="20" ry="17" fill="#2b2733" stroke="${w}" stroke-width="3"/>
  <path d="M170,120 q6,-4 12,0" fill="none" stroke="#59606e" stroke-width="2.5" stroke-linecap="round"/>`,Qe=e=>`<path d="M265,190 Q222,150 230,104 Q254,128 265,154 Q276,128 300,104 Q308,150 265,190Z" fill="${e.furDark}" ${z}/>
   <path d="M265,176 L244,128 M265,176 L286,128 M265,176 V150" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".6"/>`,$e=.72;function et(e,t){let n=n=>`
    <path d="M${n(98)},126 C${n(100)},104 ${n(138)},102 ${n(146)},128 C${n(140)},150 ${n(102)},150 ${n(98)},126Z" fill="${e.iris}" stroke="${w}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M${n(106)},140 C${n(116)},146 ${n(132)},146 ${n(140)},136" fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>
    ${t?`<circle cx="${n(122)}" cy="128" r="11" fill="${w}"/>`:`<ellipse cx="${n(122)}" cy="127" rx="7" ry="14" fill="${w}"/>`}
    <circle cx="${n(116)}" cy="${t?123:120}" r="4" fill="#fff"/>
    <circle cx="${n(128)}" cy="134" r="2" fill="#fff" opacity=".8"/>`,r=e.id===`rosa`||e.id===`prinsessa`?`<path d="M105,122 l-11,-6 M105,128 l-12,-1 M195,122 l11,-6 M195,128 l12,-1" stroke="${w}" stroke-width="4" stroke-linecap="round"/>`:``,i=t=>`<path d="M${t(96)},124 C${t(100)},100 ${t(140)},98 ${t(148)},126 C${t(132)},114 ${t(110)},114 ${t(96)},124Z" fill="${e.fur}" stroke="${w}" stroke-width="7" stroke-linejoin="round"/>`,a=e.id===`gra`&&!t?i(e=>e)+i(e=>300-e):``,o=t?`<path d="M100,104 L136,92 M200,104 L164,92" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
       <path class="tear" d="M112,152 q-7,12 0,17 q7,-5 0,-17Z" fill="#7fd4ff" stroke="${w}" stroke-width="2.5"/>
       <path class="tear tear2" d="M188,152 q-7,12 0,17 q7,-5 0,-17Z" fill="#7fd4ff" stroke="${w}" stroke-width="2.5"/>`:``,s=(e,t)=>`<g transform="translate(${e} 127) scale(${$e}) translate(${-e} -127)">${t}</g>`;return`<g class="eyes">${s(122,n(e=>e)+(a?i(e=>e):``))}${s(178,n(e=>300-e)+(a?i(e=>300-e):``))}</g>${r}${o}`}function tt(e,t){let n=e.id===`nisse`,r=n?`<path d="M84,152 C84,196 116,232 150,232 C184,232 216,196 216,152 C196,172 104,172 84,152Z" fill="#fff" ${z}/>
       <path d="M112,190 q8,8 16,0 M172,190 q8,8 16,0 M142,212 q8,8 16,0" fill="none" stroke="#cfd6e0" stroke-width="4" stroke-linecap="round"/>`:``,i=n||e.id===`rosa`||e.id===`prinsessa`?`<ellipse cx="98" cy="${n?146:158}" rx="14" ry="8" fill="#ff6f8f" opacity=".55"/><ellipse cx="202" cy="${n?146:158}" rx="14" ry="8" fill="#ff6f8f" opacity=".55"/>`:``,a=e.id===`siames`?`#7a5546`:e.belly,o=n?``:`<ellipse cx="139" cy="166" rx="14" ry="11" fill="${a}"/><ellipse cx="161" cy="166" rx="14" ry="11" fill="${a}"/>
       <ellipse cx="150" cy="182" rx="9" ry="5" fill="${a}"/>
       <g fill="${w}" opacity=".55"><circle cx="134" cy="164" r="1.6"/><circle cx="140" cy="169" r="1.6"/><circle cx="133" cy="171" r="1.6"/><circle cx="166" cy="164" r="1.6"/><circle cx="160" cy="169" r="1.6"/><circle cx="167" cy="171" r="1.6"/></g>`,s=t?`<path d="M150,160 v7 M136,180 Q150,168 164,180" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round"/>`:e.id===`gron`?`<path d="M150,160 v6 M130,170 Q150,190 170,170 Q150,176 130,170Z" fill="#fff" stroke="${w}" stroke-width="4" stroke-linejoin="round"/><path d="M136,172 l3,7 l3,-6" fill="#fff" stroke="${w}" stroke-width="2"/>`:`<path d="M150,159 v8 q-6,8 -14,4 M150,167 q6,8 14,4" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;return`${o}${r}${i}${`<g fill="none" stroke="${[`gra`,`julgran`,`svart`,`smoking`,`siames`,`stjarn`,`trollkarl`].includes(e.id)?`#fff`:w}" stroke-width="2.5" stroke-linecap="round">
    <path d="M128,162 Q98,152 62,154 M128,168 Q98,166 60,174 M130,173 Q104,180 74,194"/>
    <path d="M172,162 Q202,152 238,154 M172,168 Q202,166 240,174 M170,173 Q196,180 226,194"/></g>`}${s}${n?`<circle cx="150" cy="152" r="12" fill="${e.nose}" ${z}/><circle cx="146" cy="148" r="3" fill="#fff"/>`:`<path d="M140,149 Q150,144 160,149 Q159,155 150,160 Q141,155 140,149Z" fill="${e.nose}" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="146" cy="149" rx="3" ry="1.6" fill="#fff" opacity=".7"/>`}`}function nt(e){return e.id===`regnbage`?{main:`#9b5cff`,accent:`#ffd93d`,trim:`#fff`}:{main:e.furDark,accent:e.fur,trim:`#fff`}}function B(e,t={},n={}){let r=Ye(e.id),i=r?{...e,fur:`url(#${r.id})`}:e,a=nt(e),o=n.mood===`sad`,s=Le(t.top,a),c=n.size?`width="${n.size[0]}" height="${n.size[1]}"`:``,l=`
    <path d="M108,190 Q150,176 192,190 L206,298 Q150,332 94,298 Z" fill="${i.fur}" ${z}/>
    <path d="M118,200 L128,212 L138,200 L150,212 L162,200 L172,212 L182,200 C192,240 186,292 150,310 C114,292 108,240 118,200Z" fill="${i.belly}"/>
    <path d="M136,250 l6,6 l6,-6 M152,268 l6,6 l6,-6 M134,282 l6,6 l6,-6" fill="none" stroke="${w}" stroke-width="2.5" stroke-linecap="round" opacity=".25"/>`;return`<svg class="cat-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -60 380 500" ${c} role="img" aria-label="${i.name}">
    ${r?r.defs:``}
    <g class="tail-g">
      ${Be(Ne,i.id===`siames`?i.furDark:i.fur,22)}
      ${i.id===`tiger`?`<path d="${Ne}" fill="none" stroke="${i.furDark}" stroke-width="22" stroke-dasharray="9 15"/>`:``}
      ${i.id===`trefarg`?`<path d="${Ne}" pathLength="1" fill="none" stroke="#3e3a45" stroke-width="22" stroke-dasharray=".3 .3 .4 1" stroke-dashoffset="-.1"/>`:``}
      ${i.id===`sjojungfru`&&!t.tail?Qe(i):``}
      ${Re(t.tail,a)}
    </g>
    ${He(`l`,i,t.shoes,a)}
    ${He(`r`,i,t.shoes,a)}
    ${t.shoes===`ljusskor`?je:``}
    ${s?s.body:l}
    ${Ue(`l`,i,s?.sleeve??null,s?.cuff??null)}
    ${Ue(`r`,i,s?.sleeve??null,s?.cuff??null)}
    <g class="head-g">
      ${Xe(i)}
      ${We(i)}
      ${Ge(i)}
      ${Ke(i)}
      ${tt(i,o)}
      ${et(i,o)}
      ${i.id===`pirat`?Ze:``}
      ${Ie(t.head,a)}
    </g>
  </svg>`}function rt(e,t={}){let n=t.size?`width="${t.size[0]}" height="${t.size[1]}"`:``,r=Array.from({length:14},(e,t)=>{let n=t/14*Math.PI*2,r=(e,t)=>`${(150+Math.cos(n+t)*e).toFixed(1)},${(196+Math.sin(n+t)*e).toFixed(1)}`;return`<polygon points="${r(112,-.14)} ${r(t%2?160:182,0)} ${r(112,.14)}" fill="${t%2?`#ffb020`:`#ff8a00`}" ${z}/>`}).join(``),i=e=>`<path d="M${e(84)},128 L${e(70)},40 L${e(140)},86 Z" fill="#ffc02e" ${z}/>
     <path d="M${e(90)},112 L${e(82)},62 L${e(124)},90 Z" fill="#ff8a00"/>`;return`<svg class="cat-svg sun-cat-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -60 380 500" ${n} role="img" aria-label="${e.name} som en sol">
    <g transform="translate(0 -56)">
    <circle class="sun-glow" cx="150" cy="196" r="170" fill="#ffe67a" opacity=".35"/>
    <g class="sun-rays">${r}</g>
    ${i(e=>e)}${i(e=>300-e)}
    <circle cx="150" cy="196" r="114" fill="#ffd23f" ${z}/>
    <circle cx="124" cy="166" r="70" fill="#ffe680" opacity=".6"/>
    <path d="M104,186 Q118,170 132,186 M168,186 Q182,170 196,186" fill="none" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="96" cy="216" rx="17" ry="10" fill="#ff6f6f" opacity=".55"/><ellipse cx="204" cy="216" rx="17" ry="10" fill="#ff6f6f" opacity=".55"/>
    <path d="M140,206 Q150,201 160,206 Q159,212 150,217 Q141,212 140,206Z" fill="${e.nose}" stroke="${w}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M150,217 v6 q-8,10 -18,4 M150,223 q8,10 18,4" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="${w}" stroke-width="3" stroke-linecap="round">
      <path d="M126,214 Q96,206 62,210 M126,222 Q96,224 64,234"/>
      <path d="M174,214 Q204,206 238,210 M174,222 Q204,224 236,234"/>
    </g>
    </g>
  </svg>`}var V=`stroke="${w}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`,H=[`#ff4b4b`,`#ffd23f`,`#3fdc7c`,`#45b7ff`,`#ff6bd6`],it=`<svg viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg">
  <path d="M28,52 C18,20 66,4 96,22 C122,38 122,72 96,84 L82,70 C96,62 94,46 80,40 C62,32 42,42 46,62 Z" fill="#c9622e" ${V}/>
  <path d="M62,12 L54,42 M84,18 L68,44 M104,36 L80,52 M108,60 L86,62" stroke="#8d3f16" stroke-width="5" stroke-linecap="round"/>
  <path d="M96,84 L92,104 L78,92 L66,100 L82,70 Z" fill="#e0813f" ${V}/>
  <circle cx="35" cy="40" r="5" fill="${w}"/>
  <path d="M26,34 C14,22 8,14 6,4 M28,42 C14,38 6,32 2,22" fill="none" stroke="${w}" stroke-width="3" stroke-linecap="round"/>
  <path class="smoke" d="M70,8 q-8,-8 0,-14 M90,12 q-8,-8 0,-14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
</svg>`,at=`<svg viewBox="0 0 260 280" xmlns="http://www.w3.org/2000/svg">
  <rect x="26" y="92" width="208" height="170" rx="8" fill="#e5322d" ${V}/>
  <rect x="14" y="62" width="232" height="50" rx="8" fill="#ff5a4d" ${V}/>
  <rect x="112" y="62" width="36" height="200" fill="#ffd23f" ${V}/>
  <path d="M130,62 C90,10 40,14 58,46 C66,60 100,62 130,62 C160,62 194,60 202,46 C220,14 170,10 130,62Z" fill="#ffd23f" ${V}/>
  <circle cx="130" cy="56" r="14" fill="#ffb200" ${V}/>
  <g fill="#fff" opacity=".85"><circle cx="66" cy="150" r="7"/><circle cx="84" cy="212" r="7"/><circle cx="190" cy="146" r="7"/><circle cx="178" cy="214" r="7"/></g>
</svg>`,ot=`<svg viewBox="0 0 280 230" xmlns="http://www.w3.org/2000/svg">
  <g class="steam" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85">
    <path d="M90,62 q-14,-16 0,-30 q14,-14 0,-30"/><path d="M140,54 q-14,-16 0,-30 q14,-14 0,-30"/><path d="M190,62 q-14,-16 0,-30 q14,-14 0,-30"/>
  </g>
  <ellipse cx="140" cy="102" rx="118" ry="32" fill="#fff6dc" ${V}/>
  <path d="M70,96 q20,-14 40,-2 M150,92 q24,-12 46,4" fill="none" stroke="#e9d3a3" stroke-width="5" stroke-linecap="round"/>
  <circle cx="140" cy="98" r="11" fill="#ffd24a" ${V}/>
  <path d="M98,110 l4,3 M120,116 l5,2 M170,114 l4,-2 M188,106 l5,2 M128,84 l4,2" stroke="#9c5a1f" stroke-width="5" stroke-linecap="round"/>
  <path d="M22,104 C26,180 80,212 140,212 C200,212 254,180 258,104 C240,142 40,142 22,104Z" fill="#e5322d" ${V}/>
  <path d="M46,152 q94,46 188,0" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="3 16" stroke-linecap="round"/>
</svg>`,st=`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20,36 C2,22 2,6 13,6 C17,6 20,10 20,12 C20,10 23,6 27,6 C38,6 38,22 20,36Z" fill="#ff4b7d" stroke="${w}" stroke-width="3" stroke-linejoin="round"/></svg>`,U=e=>`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><polygon points="${A(20,20,18,8)}" fill="${e}" stroke="${w}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;function ct(e,t,n){return`<g transform="translate(${e} ${t}) scale(${n})">
    <rect x="-16" y="-20" width="32" height="30" fill="#6b3f1d" ${V}/>
    <path d="M0,-150 L95,-18 Q0,4 -95,-18 Z" fill="#14733f" ${V}/>
    <path d="M0,-210 L72,-92 Q0,-72 -72,-92 Z" fill="#1a8c4d" ${V}/>
    <path d="M0,-268 L50,-164 Q0,-146 -50,-164 Z" fill="#23a55f" ${V}/>
    <polygon points="${A(0,-272,24,10)}" fill="#ffd23f" ${V}/>
    ${[[0,-240],[-26,-196],[24,-176],[-48,-130],[44,-122],[-10,-146],[-72,-66],[70,-62],[20,-84],[-24,-70]].map(([e,t],n)=>`<circle class="bulb-glow" style="animation-delay:-${n*.37%1}s" cx="${e}" cy="${t}" r="7.5" fill="${H[n%5]}" stroke="${w}" stroke-width="2.5"/>`).join(``)}
  </g>`}function lt(e,t,n,r,i){return`<g transform="translate(${e} ${t}) scale(${n})"><rect x="-30" y="-44" width="60" height="44" fill="${r}" ${V}/><rect x="-7" y="-44" width="14" height="44" fill="${i}"/><path d="M-30,-26 H30" stroke="${i}" stroke-width="10"/><path d="M0,-44 c-20,-20 -28,-2 0,0 c28,-2 20,-20 0,0" fill="${i}" ${V}/></g>`}function ut(e,t){return`<g class="judge" transform="translate(${e} 640)">${{tomte:`<path d="M-36,70 Q-40,0 0,0 Q40,0 36,70Z" fill="#e5322d" ${V}/><circle cy="-22" r="30" fill="#ffd9bd" ${V}/>
      <path d="M-30,-16 C-34,32 34,32 30,-16 C14,-4 -14,-4 -30,-16Z" fill="#fff" ${V}/>
      <ellipse class="chew" cx="2" cy="-4" rx="8" ry="6" fill="#7a1f2b" stroke="${w}" stroke-width="3"/>
      <path d="M-30,-36 C-22,-78 14,-78 36,-70 C42,-58 38,-48 30,-38Z" fill="#e5322d" ${V}/><rect x="-36" y="-46" width="72" height="16" rx="8" fill="#fff" ${V}/><circle cx="40" cy="-68" r="9" fill="#fff" ${V}/>
      <circle cx="-10" cy="-20" r="4" fill="${w}"/><circle cx="10" cy="-20" r="4" fill="${w}"/>
      <path d="M-18,-30 l8,3 M18,-30 l-8,3" stroke="${w}" stroke-width="3" stroke-linecap="round"/>
      <g class="judge-crumbs" fill="#c07a38" stroke="${w}" stroke-width="1.5">
        <rect class="judge-crumb" x="4" y="8" width="6" height="5" rx="1.5"/>
        <rect class="judge-crumb c2" x="-8" y="12" width="5" height="5" rx="1.5"/>
        <rect class="judge-crumb c3" x="12" y="14" width="5" height="4" rx="1.5"/>
      </g>
      <g class="munch-arm">
        <path d="M30,34 Q48,20 42,2" fill="none" stroke="${w}" stroke-width="20" stroke-linecap="round"/>
        <path d="M30,34 Q48,20 42,2" fill="none" stroke="#e5322d" stroke-width="12" stroke-linecap="round"/>
        <path d="M8,-11 L50,-11 Q58,-11 58,-4 Q58,3 50,3 L8,3 Q4,0 7,-2 Q3,-4 7,-6 Q3,-9 8,-11Z" fill="#c07a38" stroke="${w}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M22,-4 l4,-4 l4,4 l4,-4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="44" cy="-2" r="9" fill="#2fbf71" ${V}/>
      </g>`,ren:`<path d="M-30,70 Q-34,4 0,4 Q34,4 30,70Z" fill="#a8703b" ${V}/><ellipse cy="-22" rx="27" ry="31" fill="#a8703b" ${V}/>
      <path d="M-14,-50 C-20,-70 -30,-78 -38,-92 M-24,-68 l-16,-2 M14,-50 C20,-70 30,-78 38,-92 M24,-68 l16,-2" fill="none" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
      <circle cy="-6" r="9" fill="#e5322d" ${V}/><circle cx="-11" cy="-28" r="4" fill="${w}"/><circle cx="11" cy="-28" r="4" fill="${w}"/>`,pepparkaka:`<g class="tremble">
      <defs>
        <mask id="pk-bite" maskUnits="userSpaceOnUse" x="-60" y="-80" width="140" height="170">
          <rect x="-60" y="-80" width="140" height="170" fill="#fff"/>
          <circle cx="-24" cy="-44" r="13" fill="#000"/><circle cx="-31" cy="-26" r="11" fill="#000"/><circle cx="-14" cy="-56" r="10" fill="#000"/>
          <circle cx="-31" cy="16" r="11" fill="#000"/><circle cx="-34" cy="32" r="10" fill="#000"/>
        </mask>
        <clipPath id="pk-shape"><circle cy="-24" r="30"/><path d="M-32,70 Q-36,4 0,4 Q36,4 32,70Z"/></clipPath>
      </defs>
      <path d="M28,22 L54,-8" stroke="${w}" stroke-width="22" stroke-linecap="round"/>
      <path d="M28,22 L54,-8" stroke="#c07a38" stroke-width="13" stroke-linecap="round"/>
      <path d="M40,8 l7,2 M46,0 l7,2" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <g mask="url(#pk-bite)">
        <path d="M-32,70 Q-36,4 0,4 Q36,4 32,70Z" fill="#c07a38" ${V}/><circle cy="-24" r="30" fill="#c07a38" ${V}/>
      </g>
      <g clip-path="url(#pk-shape)" fill="#e0a368" stroke="${w}" stroke-width="4">
        <circle cx="-24" cy="-44" r="13"/><circle cx="-31" cy="-26" r="11"/><circle cx="-14" cy="-56" r="10"/>
        <circle cx="-31" cy="16" r="11"/><circle cx="-34" cy="32" r="10"/>
      </g>
      <circle cx="-9" cy="-28" r="6" fill="#fff"/><circle cx="13" cy="-28" r="6" fill="#fff"/>
      <circle cx="-12" cy="-28" r="2.8" fill="${w}"/><circle cx="10" cy="-28" r="2.8" fill="${w}"/>
      <path d="M-17,-38 l10,-5 M21,-38 l-10,-5" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M-8,-9 q4,-5 8,0 q4,5 8,0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <path class="sweat" d="M24,-50 q-6,10 0,14 q6,-4 0,-14Z" fill="#7fd4ff" stroke="${w}" stroke-width="2.5"/>
      <circle cy="26" r="5" fill="#e5322d"/><circle cy="46" r="5" fill="#2fbf71"/>
    </g>`}[t]}</g>`}function dt(){let e=[{y:500,s:.45},{y:545,s:.6},{y:600,s:.75},{y:665,s:.95},{y:745,s:1.15},{y:840,s:1.4}],t=e=>110+(e-470)/430*410,n=Array.from({length:15},(e,t)=>k(60+t*106,42+26*Math.sin(t/14*Math.PI*7)**2+16,H[t%5],0,1.1)).join(``);return`<svg class="backdrop" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1160"/><stop offset="1" stop-color="#5a1c78"/></linearGradient>
      <linearGradient id="carpet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a81632"/><stop offset="1" stop-color="#ee2b4c"/></linearGradient>
      <radialGradient id="door"><stop offset="0" stop-color="#fff5c4"/><stop offset=".55" stop-color="#ffc247" stop-opacity=".85"/><stop offset="1" stop-color="#ffc247" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1600" height="480" fill="url(#wall)"/>
    <rect y="470" width="1600" height="430" fill="#1a0d3e"/>
    <path d="M0,470 C260,430 420,478 640,470 L0,560Z M1600,470 C1340,430 1180,478 960,470 L1600,560Z" fill="#e8f1ff"/>
    <path d="M0,540 C120,500 240,520 340,600 L140,720 L0,740Z M1600,540 C1480,500 1360,520 1260,600 L1460,720 L1600,740Z" fill="#dbe7fb" opacity=".22"/>

    <ellipse cx="800" cy="360" rx="240" ry="190" fill="url(#door)"/>
    <path d="M680,472 L680,290 Q800,190 920,290 L920,472Z" fill="#fff0b3" ${V}/>
    <path d="M680,472 L680,290 Q700,330 722,472Z M920,472 L920,290 Q900,330 878,472Z" fill="#c8203a" ${V}/>

    <g>
      <rect x="470" y="118" width="660" height="136" rx="20" fill="#7b1228" ${V}/>
      ${Array.from({length:13},(e,t)=>`<circle class="bulb-glow" style="animation-delay:-${t*.27%1}s" cx="${500+t*50}" cy="134" r="8" fill="${H[t%5]}"/><circle class="bulb-glow" style="animation-delay:-${t*.41%1}s" cx="${500+t*50}" cy="238" r="8" fill="${H[(t+2)%5]}"/>`).join(``)}
      <text x="800" y="210" text-anchor="middle" font-family="'Mountains of Christmas',Georgia,serif" font-weight="700" font-size="74" fill="#ffe27a" stroke="${w}" stroke-width="4" paint-order="stroke">Julkattens Catwalk</text>
    </g>

    <path d="M0,0 H250 C226,190 150,330 0,420Z" fill="#b5172f" ${V}/>
    <path d="M1600,0 H1350 C1374,190 1450,330 1600,420Z" fill="#b5172f" ${V}/>
    <path d="M46,0 C60,120 40,240 0,330 M110,0 C120,120 96,220 40,300 M180,0 C176,100 140,200 84,270 M1554,0 C1540,120 1560,240 1600,330 M1490,0 C1480,120 1504,220 1560,300 M1420,0 C1424,100 1460,200 1516,270" fill="none" stroke="#7d0d20" stroke-width="7"/>
    <path d="M0,20 C200,90 400,90 600,40 S1000,-4 1200,40 S1500,90 1600,20" fill="none" stroke="#14733f" stroke-width="22" stroke-linecap="round"/>
    ${n}

    <g class="spot"><path d="M300,0 L880,900 L520,900 Z" fill="#fff4b8" opacity=".09"/></g>
    <g class="spot spot2"><path d="M1300,0 L1080,900 L720,900 Z" fill="#ffc6ec" opacity=".09"/></g>

    ${ct(390,560,.72)}${ct(1210,560,.72)}
    ${lt(455,562,.9,`#45b7ff`,`#fff`)}${lt(1148,562,.9,`#ffd23f`,`#e5322d`)}
    ${ct(1420,730,1.15)}${lt(1300,742,1.3,`#ff6bd6`,`#ffd23f`)}${lt(1530,762,1.4,`#3fdc7c`,`#e5322d`)}

    <path d="M690,470 L910,470 L1320,900 L280,900Z" fill="url(#carpet)" ${V}/>
    <path d="M800,470 L800,900" stroke="#ffd23f" stroke-width="10" stroke-dasharray="26 34" opacity=".7"/>
    <path d="M740,470 L560,900 M860,470 L1040,900" stroke="#fff" stroke-width="5" opacity=".2"/>
    ${e.map((e,n)=>{let r=t(e.y);return`<g class="rowbulb">${k(800-r+6,e.y,H[n%5],0,e.s)}${k(800+r-6,e.y,H[(n+2)%5],0,e.s)}</g>`}).join(``)}

    <g>
      ${ut(290,`ren`)}${ut(190,`pepparkaka`)}${ut(90,`tomte`)}
      <path d="M26,690 H356 L374,806 H8 Z" fill="#14733f" ${V}/>
      <path d="M26,690 q27,30 55,0 q27,30 55,0 q27,30 55,0 q27,30 55,0 q27,30 55,0 q27,30 55,0" fill="#ffd23f" ${V}/>
      <text x="190" y="782" text-anchor="middle" font-family="'Baloo 2',Verdana,sans-serif" font-weight="800" font-size="30" fill="#fff">DOMARNA</text>
    </g>
  </svg>`}function ft(){return`<svg class="audience" viewBox="0 0 1680 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Array.from({length:22},(e,t)=>{let n=20+t*75+t%3*8,r=58+t*37%26,i=34+t*11%10;return`<g fill="${t%2?`#150a2f`:`#201040`}"><path d="M${n-i},${r} L${n-i+2},${r-i-16} L${n-4},${r-i+6} Z M${n+i},${r} L${n+i-2},${r-i-16} L${n+4},${r-i+6} Z"/><ellipse cx="${n}" cy="${r+6}" rx="${i}" ry="${i-4}"/></g>`}).join(``)}<rect y="96" width="1680" height="40" fill="#150a2f"/></svg>`}var pt=`<svg viewBox="0 0 620 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M40,300 C20,150 30,90 80,70 C140,50 160,120 130,150 L120,250 Z" fill="#a8142b" ${V}/>
  <path d="M60,100 C70,74 110,72 118,100" fill="none" stroke="#ffd23f" stroke-width="9" stroke-linecap="round"/>
</svg>`,mt=`<svg viewBox="0 0 620 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M30,362 H520 C590,362 610,300 580,276 C566,266 550,278 556,292 C562,316 540,330 520,330 H30Z" fill="#ffd23f" ${V}/>
  <path d="M120,330 V300 M420,330 V300" stroke="${w}" stroke-width="16"/>
  <path d="M120,330 V300 M420,330 V300" stroke="#ffd23f" stroke-width="8"/>
  <path d="M36,304 C24,240 36,190 80,178 L470,178 C500,178 520,150 560,150 C590,150 600,180 580,200 C550,232 530,304 460,304Z" fill="#e5322d" ${V}/>
  <path d="M60,204 H470 C498,204 512,184 544,178" fill="none" stroke="#ffd23f" stroke-width="10" stroke-linecap="round"/>
  <path d="M60,282 H440" stroke="#ffd23f" stroke-width="7" stroke-linecap="round" stroke-dasharray="3 22"/>
  <polygon points="${A(170,244,26)}" fill="#ffd23f" ${V}/>
  <polygon points="${A(270,244,26)}" fill="#ffd23f" ${V}/>
  <polygon points="${A(370,244,26)}" fill="#ffd23f" ${V}/>
</svg>`,ht=`<svg viewBox="0 0 280 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="rein-legs">
    <path d="M70,190 L52,276 M104,194 L100,282 M176,190 L190,270 M204,180 L228,262" fill="none" stroke="${w}" stroke-width="28" stroke-linecap="round"/>
    <path d="M70,190 L52,276 M104,194 L100,282 M176,190 L190,270 M204,180 L228,262" fill="none" stroke="#a8703b" stroke-width="19" stroke-linecap="round"/>
  </g>
  <ellipse cx="136" cy="160" rx="90" ry="50" fill="#a8703b" ${V}/>
  <path d="M48,146 L18,120" stroke="${w}" stroke-width="16" stroke-linecap="round"/>
  <path d="M196,130 C210,100 214,84 214,66" fill="none" stroke="${w}" stroke-width="50" stroke-linecap="round"/>
  <path d="M196,130 C210,100 214,84 214,66" fill="none" stroke="#a8703b" stroke-width="40" stroke-linecap="round"/>
  <path d="M196,34 C184,10 176,0 164,-6 M186,18 l-18,0 M232,34 C244,10 252,0 264,-6 M242,18 l18,0" transform="translate(0 6)" fill="none" stroke="${w}" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="226" cy="62" rx="36" ry="30" fill="#a8703b" ${V}/>
  <ellipse cx="184" cy="46" rx="20" ry="9" transform="rotate(16 184 46)" fill="#8a5527" ${V}/>
  <circle cx="218" cy="52" r="5" fill="${w}"/>
  <circle class="bulb-glow" cx="258" cy="68" r="22" fill="#ff5a4d" opacity=".45"/>
  <circle cx="258" cy="68" r="12" fill="#e5322d" ${V}/>
  <path d="M184,112 Q220,136 232,100" fill="none" stroke="#e5322d" stroke-width="14" stroke-linecap="round"/>
  <circle cx="214" cy="130" r="10" fill="#ffd23f" ${V}/>
</svg>`,gt=`<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M60,120 C14,120 14,60 62,62 C70,18 136,14 150,50 C178,24 232,36 230,70 C276,70 276,120 236,120Z" fill="#6a7186" ${V}/>
  <g class="rain" stroke="#7fd4ff" stroke-width="6" stroke-linecap="round">
    <path d="M80,134 l-6,18"/><path d="M122,136 l-6,18"/><path d="M164,134 l-6,18"/><path d="M206,136 l-6,18"/>
  </g>
</svg>`,_t=`<svg class="winter" viewBox="-400 0 2400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="1440" cy="210" r="130" fill="#fff3bf" opacity=".12"/>
  <circle cx="1440" cy="210" r="74" fill="#fff3bf"/>
  <circle cx="1412" cy="192" r="13" fill="#f1dc95"/><circle cx="1460" cy="236" r="20" fill="#f1dc95"/><circle cx="1470" cy="180" r="8" fill="#f1dc95"/>
  <path d="M-400,700 C-240,660 -120,670 0,690 C220,600 430,640 700,700 C980,760 1270,640 1600,690 C1740,712 1860,660 2000,680 L2000,900 L-400,900Z" fill="#c9dcf7"/>
  <path d="M-400,800 C-260,770 -120,770 0,780 C300,710 620,770 900,800 C1180,830 1400,760 1600,790 C1760,814 1880,770 2000,785 L2000,900 L-400,900Z" fill="#f2f7ff"/>
  <g transform="translate(120 700)" fill="#14733f" stroke="${w}" stroke-width="5" stroke-linejoin="round"><path d="M0,-150 L60,-30 L-60,-30Z"/><path d="M0,-90 L74,30 L-74,30Z"/></g>
  <g transform="translate(-200 715) scale(.9)" fill="#14733f" stroke="${w}" stroke-width="5" stroke-linejoin="round"><path d="M0,-150 L60,-30 L-60,-30Z"/><path d="M0,-90 L74,30 L-74,30Z"/></g>
  <g transform="translate(1820 720) scale(1)" fill="#178a4d" stroke="${w}" stroke-width="5" stroke-linejoin="round"><path d="M0,-150 L60,-30 L-60,-30Z"/><path d="M0,-90 L74,30 L-74,30Z"/></g>
  <g transform="translate(1500 700) scale(1.2)" fill="#178a4d" stroke="${w}" stroke-width="5" stroke-linejoin="round"><path d="M0,-150 L60,-30 L-60,-30Z"/><path d="M0,-90 L74,30 L-74,30Z"/></g>
</svg>`,vt=e=>`<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,8 C36,8 37,16 42,15 C48,14 52,20 48,26 C45,30 54,33 51,39 C48,45 41,42 39,47 C37,53 30,54 27,49 C24,44 17,50 13,44 C9,38 15,35 11,30 C7,25 12,18 18,19 C23,20 24,8 30,8Z" fill="${e}" stroke="${w}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="54" cy="12" r="4" fill="${e}" stroke="${w}" stroke-width="2"/>
    <circle cx="7" cy="52" r="3.5" fill="${e}" stroke="${w}" stroke-width="2"/>
    <ellipse cx="24" cy="24" rx="5" ry="3" fill="#fff" opacity=".6" transform="rotate(-30 24 24)"/>
  </svg>`,yt=e=>`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <path d="M60,108 C40,116 20,112 6,118" fill="none" stroke="${w}" stroke-width="7" stroke-linecap="round"/>
    <path d="M60,108 C40,116 20,112 6,118" fill="none" stroke="${e}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="60" cy="60" r="48" fill="${e}" stroke="${w}" stroke-width="5"/>
    <g fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".55">
      <path d="M24,40 Q60,20 96,44"/><path d="M18,62 Q60,40 102,66"/><path d="M24,84 Q60,62 96,86"/>
      <path d="M44,16 Q30,60 46,104"/><path d="M76,16 Q92,60 74,104"/>
    </g>
  </svg>`,bt=(()=>{let e=[];for(let t=0;t<7;t++)for(let n=0;n<7;n++){let r=22+n*17,i=82+t*17;if((r+8-80)**2+(i+8-140)**2>3136)continue;let a=(t*3+n*5)%4==0;e.push(`<rect class="${a?`facet`:``}" style="animation-delay:-${(t+n)%4*.1}s" x="${r}" y="${i}" width="15" height="15" fill="${a?`#ffffff`:(t+n)%2?`#aab4c3`:`#d5dbe4`}"/>`)}return`<svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
    <path d="M80,0 V80" stroke="${w}" stroke-width="4"/>
    <defs><clipPath id="disco-clip"><circle cx="80" cy="140" r="58"/></clipPath></defs>
    <circle cx="80" cy="140" r="60" fill="#8a95a6"/>
    <g clip-path="url(#disco-clip)">${e.join(``)}</g>
    <circle cx="80" cy="140" r="60" fill="none" stroke="${w}" stroke-width="5"/>
    <rect x="70" y="72" width="20" height="12" rx="3" fill="#59606e" stroke="${w}" stroke-width="3"/>
  </svg>`})(),xt=`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="17" fill="#f5c518" stroke="${w}" stroke-width="3"/>
  <circle cx="20" cy="20" r="11" fill="none" stroke="#d9a400" stroke-width="3"/>
  <polygon points="${A(20,20,7,3)}" fill="#fff3b0"/>
</svg>`,St=`<svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg">
  <path d="M30,46 C20,20 120,10 180,16 C250,10 350,22 336,48 C350,74 250,84 180,78 C110,86 14,74 30,46Z" fill="#5aa9ff" stroke="${w}" stroke-width="6"/>
  <ellipse cx="130" cy="38" rx="60" ry="9" fill="#fff" opacity=".55"/>
  <ellipse cx="250" cy="58" rx="30" ry="5" fill="#fff" opacity=".4"/>
</svg>`,Ct=`<svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg"><path d="M10,2 Q19,16 10,26 Q1,16 10,2Z" fill="#7fd4ff" stroke="${w}" stroke-width="2"/></svg>`,wt=`<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M30,4 C46,24 56,40 50,58 C46,72 36,78 30,78 C20,78 10,70 10,56 C10,44 18,38 20,26 C26,34 28,38 30,40 C32,30 32,18 30,4Z" fill="#ff7a1a" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M30,36 C38,48 42,58 38,66 C36,72 32,74 30,74 C24,74 20,68 21,60 C22,54 26,50 30,36Z" fill="#ffd23f"/>
</svg>`,Tt=`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="16" fill="#8a8f99" opacity=".85"/></svg>`,Et=`<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,300 L0,170 C60,60 200,10 300,60 C350,86 350,150 300,146 C262,142 272,104 304,104 C370,112 420,70 490,96 C560,122 610,116 640,104 L640,300Z" fill="#2f8fe0" stroke="${w}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M28,180 C100,84 214,52 286,90" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".75"/>
  <path d="M0,232 Q160,200 320,232 T640,222" fill="none" stroke="#7cc8ff" stroke-width="9" opacity=".8"/>
  <g fill="#fff" stroke="${w}" stroke-width="4"><circle cx="300" cy="60" r="16"/><circle cx="326" cy="80" r="12"/><circle cx="272" cy="50" r="12"/></g>
</svg>`,Dt=`<svg viewBox="0 0 100 84" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="56" rx="38" ry="24" fill="#4cc85a" stroke="${w}" stroke-width="5"/>
  <circle cx="30" cy="26" r="15" fill="#4cc85a" stroke="${w}" stroke-width="5"/><circle cx="70" cy="26" r="15" fill="#4cc85a" stroke="${w}" stroke-width="5"/>
  <circle cx="30" cy="24" r="8" fill="#fff"/><circle cx="32" cy="25" r="4" fill="${w}"/>
  <circle cx="70" cy="24" r="8" fill="#fff"/><circle cx="68" cy="25" r="4" fill="${w}"/>
  <path d="M32,60 Q50,72 68,60" fill="none" stroke="${w}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="22" cy="58" r="5" fill="#ff8fb0" opacity=".7"/><circle cx="78" cy="58" r="5" fill="#ff8fb0" opacity=".7"/>
  <polygon points="${A(50,8,9)}" fill="#ffd23f" stroke="${w}" stroke-width="2"/>
</svg>`,Ot=e=>`<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M8,52 C8,22 30,8 54,8 C54,32 40,52 8,52Z" fill="${e}" stroke="${w}" stroke-width="4" stroke-linejoin="round"/><path d="M10,50 L46,16" stroke="${w}" stroke-width="3" stroke-linecap="round"/></svg>`,kt=e=>`Spelare ${e+1}`,At=e=>e.nicknamed?e.name:e.name.toLowerCase(),W=e=>e.cpu?`Datorn`:kt(e.index),G=e=>`p${e+1}`,K=e=>`<kbd class="key" aria-label="${e===`left`?`Vänster piltangent`:`Höger piltangent`}">${e===`left`?`←`:`→`}</kbd>`,q=(e,t={},n=``)=>`<div class="cat-box ${n}">${B(e,t)}</div>`,J={x:800,y:470},jt={x:190,y:620};function Y(e,t){e.commentary.innerHTML=`<span>${t}</span>`}function Mt(e,t){e.banner.textContent=t,e.banner.classList.remove(`show`),e.banner.offsetWidth,e.banner.classList.add(`show`)}function Nt(e){let t=document.createElement(`div`);t.className=`flash`,t.style.left=`${40+Math.random()*1520}px`,t.style.top=`${770+Math.random()*70}px`,e.flashes.appendChild(t),t.addEventListener(`animationend`,()=>t.remove()),o.flash()}async function Pt(e,t){e.root.classList.add(`pink-shock`),t.animate([{transform:`rotateY(0deg)`},{transform:`rotateY(1440deg)`}],{duration:1700,easing:`cubic-bezier(.3,0,.3,1)`});for(let t=0;t<4;t++)b(e.fx,{x:J.x,y:J.y,count:22,size:e=>30+e%4*16,html:e=>U([`#ff7ac3`,`#ff4fa8`,`#ffc1e3`][e%3]),distance:[220,720],duration:[900,1500]}),await g(420);await g(700),e.root.classList.remove(`pink-shock`)}async function Ft(e,t){t.classList.add(`sneaky`);let n=document.createElement(`div`);n.className=`prop shrimp`,n.innerHTML=it,e.fx.appendChild(n),await n.animate([{transform:`translate(${J.x-90}px, ${J.y+60}px) rotate(0deg) scale(.5)`},{transform:`translate(${J.x-220}px, ${J.y-40}px) rotate(-30deg) scale(1.5)`,offset:.3},{transform:`translate(${(J.x+jt.x)/2-90}px, ${J.y-170}px) rotate(-180deg) scale(1.4)`,offset:.62},{transform:`translate(${jt.x-70}px, ${jt.y-50}px) rotate(-340deg) scale(1)`}],{duration:1300,easing:`ease-in-out`,fill:`forwards`}).finished,n.remove(),e.root.querySelectorAll(`.judge`).forEach(e=>e.classList.add(`smitten`)),b(e.fx,{x:jt.x,y:jt.y-30,count:26,size:e=>28+e%3*12,html:()=>st,distance:[80,280],angle:[200,340],duration:[900,1500],stagger:25}),Y(e,`Domarna smackar belåtet. Helt lagligt? Knappast.`),await g(1500),t.classList.remove(`sneaky`),e.root.querySelectorAll(`.judge`).forEach(e=>e.classList.remove(`smitten`))}async function It(e,t){te(e.fx,J.x,J.y),t.style.opacity=`0`;let n=document.createElement(`div`);n.className=`prop gift`,n.innerHTML=at,e.fx.appendChild(n),Y(e,`Publiken letar. Domarna letar. Det är ju bara ett paket där!`),await g(2100),n.classList.add(`open`),te(e.fx,J.x,J.y+60),o.tada(),b(e.fx,{x:J.x,y:J.y+40,count:30,size:22,html:e=>U([`#ffd23f`,`#e5322d`,`#3fdc7c`][e%3]),distance:[200,560],duration:[800,1300]}),await g(180),n.remove(),t.style.opacity=`1`,await g(600)}async function Lt(e,t){t.classList.add(`shaking`);let n=e=>`<div class="glitter" style="background:${[`#ffd23f`,`#fff`,`#ff6bd6`,`#7fe7ff`][e%4]}"></div>`;for(let t=0;t<7;t++)b(e.fx,{x:J.x,y:J.y-40,count:14,size:44,spread:300,html:()=>`<div class="needle"></div>`,distance:[180,420],angle:[60,120],gravity:120,duration:[800,1300]}),b(e.fx,{x:J.x,y:J.y-40,count:16,size:30,spread:340,html:n,distance:[200,520],angle:[20,160],gravity:80,duration:[900,1500]}),await g(300);t.classList.remove(`shaking`),await g(700)}async function Rt(e){let t=J.x+300,n=J.y+90;te(e.fx,t,n);let r=document.createElement(`div`);r.className=`prop bowl`,r.innerHTML=ot,e.fx.appendChild(r),await g(500),b(e.fx,{x:t,y:n-40,count:20,size:e=>26+e%3*12,html:()=>st,distance:[120,340],angle:[220,320],duration:[1e3,1600],stagger:60}),Y(e,`Doften av kanel sprider sig. Hela salen blir sugen!`),await g(2300),r.classList.add(`gone`),await g(350),r.remove()}async function zt(e,t){let n=document.createElement(`div`);n.className=`rainbow-bridge`,n.innerHTML=`<svg viewBox="0 0 1600 700" aria-hidden="true">
    ${D.map((e,t)=>{let n=720-t*42;return`<path pathLength="1" d="M${800-n},700 A${n},${n*.82} 0 0 1 ${800+n},700" fill="none" stroke="${e}" stroke-width="44" style="animation-delay:${t*.08}s"/>`}).join(``)}
  </svg>`,e.walkLayer.prepend(n),t.classList.add(`rainbow-glow`),await g(900);for(let t=0;t<3;t++)b(e.fx,{x:J.x,y:J.y,count:24,size:e=>24+e%3*14,html:e=>U(D[e%D.length]),distance:[200,640],duration:[900,1500]}),await g(450);Y(e,`Publiken letar efter skatten i slutet av regnbågen!`),await g(1100),n.classList.add(`fade`),t.classList.remove(`rainbow-glow`),await g(500),n.remove()}async function Bt(e,t,n){let r=[t.fur,t.furDark,t.belly],i=document.createElement(`div`);i.className=`paint-wash`,i.style.background=`radial-gradient(circle at 50% 55%, ${t.fur} 0%, ${t.furDark} 70%)`,e.walkLayer.prepend(i),n.animate([{transform:`translateY(0)`},{transform:`translateY(-140px) scale(1.05)`},{transform:`translateY(0) scale(1.1, .9)`},{transform:`translateY(0)`}],{duration:800,easing:`ease-in-out`}),await g(560);let a=[];for(let t=0;t<3;t++){b(e.fx,{x:J.x,y:J.y,count:22,size:e=>34+e%4*16,html:e=>vt(r[e%2]),distance:[220,760],duration:[800,1300]});for(let e=0;e<5;e++){let n=document.createElement(`div`);n.className=`paint-stain`;let o=90+Math.random()*110;n.style.width=`${o}px`,n.style.height=`${o}px`,n.style.left=`${80+Math.random()*1340}px`,n.style.top=`${120+Math.random()*600}px`,n.style.transform=`rotate(${Math.random()*360}deg)`,n.innerHTML=vt(r[(e+t)%2]),i.after(n),a.push(n)}await g(430)}Y(e,`Allt blev ${{rod:`rött`,orange:`orange`,gul:`gult`,bla:`blått`,lila:`lila`}[t.id]??`färgglatt`}! Städaren svimmar.`),await g(1300),i.classList.add(`fade`),a.forEach(e=>e.classList.add(`fade`)),await g(600),i.remove(),a.forEach(e=>e.remove())}var Vt={svart:`#e5322d`,vit:`#45a7ff`,tiger:`#3fdc7c`,trefarg:`#ff6fb5`,siames:`#9b5cff`,smoking:`#ffd23f`};async function Ht(e,t,n){let r=document.createElement(`div`);r.className=`prop yarn`,r.innerHTML=yt(Vt[t.id]??`#e5322d`),e.fx.appendChild(r),await r.animate([{transform:`translateX(0) rotate(0deg)`},{transform:`translateX(-560px) rotate(-760deg)`}],{duration:1200,easing:`cubic-bezier(.2,.7,.4,1)`,fill:`forwards`}).finished,o.meow(t.voice),await n.animate([{transform:`translate(0, 0)`},{transform:`translate(90px, -150px) rotate(14deg)`,offset:.45},{transform:`translate(170px, 10px) rotate(4deg) scale(1.05, .92)`,offset:.75},{transform:`translate(0, 0)`}],{duration:1100,easing:`ease-in-out`}).finished,b(e.fx,{x:J.x+60,y:J.y+40,count:24,size:e=>28+e%3*12,html:()=>st,distance:[160,520],angle:[200,340],duration:[1e3,1600],stagger:40}),Y(e,`Domarna smälter: Åh, vilken gullig katt!`),await g(1400),await r.animate([{transform:`translateX(-560px) rotate(-760deg)`},{transform:`translateX(-1800px) rotate(-2200deg)`}],{duration:1100,easing:`ease-in`,fill:`forwards`}).finished,r.remove()}async function Ut(e,t){let n=document.createElement(`div`);n.className=`prop disco`,n.innerHTML=bt,e.fx.appendChild(n),n.animate([{transform:`translateY(-260px)`},{transform:`translateY(0)`}],{duration:800,easing:`cubic-bezier(.2,1.4,.4,1)`}),await g(700),e.root.classList.add(`disco`),t.classList.add(`dancing`);let r=[`#ffffff`,`#ff6bd6`,`#45a7ff`,`#ffd93d`,`#3fdc7c`];for(let t=0;t<5;t++)b(e.fx,{x:1260,y:180,count:20,size:e=>16+e%3*10,html:e=>`<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="${r[e%r.length]}" opacity=".85"/></svg>`,distance:[300,900],angle:[60,240],duration:[900,1300]}),t===2&&Y(e,`Hela salen dansar! Till och med Tomten.`),await g(520);await g(600),e.root.classList.remove(`disco`),t.classList.remove(`dancing`),await n.animate([{transform:`translateY(0)`},{transform:`translateY(-280px)`}],{duration:500,easing:`ease-in`,fill:`forwards`}).finished,n.remove()}async function Wt(e,t){t.classList.add(`gold-glow`);for(let t=0;t<6;t++){for(let t=0;t<4;t++)b(e.fx,{x:100+Math.random()*1400,y:-30,count:5,size:e=>30+e%3*10,html:()=>xt,distance:[600,950],angle:[80,100],duration:[1100,1600],spread:120});t===2&&Y(e,`Det regnar guld! Domarna fyller fickorna.`),await g(420)}b(e.fx,{x:jt.x,y:jt.y-60,count:14,size:34,html:()=>xt,distance:[60,200],angle:[220,320],duration:[700,1100]}),await g(1200),t.classList.remove(`gold-glow`)}async function Gt(e,t){let n=t.animate([{transform:`translate(0, 0) rotate(0deg)`},{transform:`translate(-40px, -200px) rotate(-160deg)`,offset:.4},{transform:`translate(40px, -230px) rotate(-300deg)`,offset:.7},{transform:`translate(0, 0) rotate(-360deg)`}],{duration:3e3,easing:`ease-in-out`});for(let t=0;t<5;t++)b(e.fx,{x:J.x,y:J.y-120,count:12,size:e=>22+e%3*12,html:e=>U([`#ffd23f`,`#ffffff`,`#8ad1ff`][e%3]),distance:[200,620],duration:[1400,2200]}),t===2&&Y(e,`Katten svävar tyngdlöst! Domarna tappar hakan.`),await g(520);await n.finished}async function Kt(e,t){let n=document.createElement(`div`);n.className=`prop wave`,n.innerHTML=Et,e.fx.appendChild(n);let r=n.animate([{transform:`translateX(1700px)`},{transform:`translateX(-900px)`}],{duration:2600,easing:`ease-in-out`,fill:`forwards`});await g(700),t.animate([{transform:`translate(0, 0) rotate(0deg)`},{transform:`translate(-60px, -150px) rotate(-12deg)`,offset:.35},{transform:`translate(-180px, -120px) rotate(-6deg)`,offset:.7},{transform:`translate(0, 0) rotate(0deg)`}],{duration:1700,easing:`ease-in-out`}),await g(800),b(e.fx,{x:jt.x,y:jt.y-60,count:26,size:e=>16+e%3*8,html:()=>Ct,distance:[80,360],angle:[200,340],duration:[700,1200]}),Y(e,`Plask! Domarna blev blöta, men de skrattar.`),await r.finished,n.remove(),await g(500)}async function qt(e,t){t.classList.add(`magic`);for(let t=0;t<3;t++)b(e.fx,{x:J.x,y:J.y-40,count:16,size:e=>20+e%3*10,html:e=>U([`#c9b8ff`,`#ff8ac4`,`#ffd23f`][e%3]),distance:[80,300],duration:[700,1100]}),await g(380);b(e.fx,{x:J.x,y:J.y+40,count:18,size:e=>54+e%3*16,html:()=>Dt,distance:[300,820],angle:[190,350],duration:[1500,2300],gravity:380,stagger:50}),Y(e,`Sim sala bim! Hela scenen är full av grodor!`),await g(2300),t.classList.remove(`magic`)}async function Jt(e,t){t.animate([{transform:`scale(1)`},{transform:`scale(1.25) translateY(-20px)`,offset:.3},{transform:`scale(1.25) translateY(-20px)`,offset:.7},{transform:`scale(1)`}],{duration:1600,easing:`ease-in-out`}),e.root.classList.add(`roar-shake`);for(let t=0;t<5;t++){for(let t=0;t<3;t++)b(e.fx,{x:100+Math.random()*1400,y:-30,count:4,size:e=>34+e%3*12,html:e=>Ot([`#3fbf6f`,`#2e9a52`,`#8fd14f`][e%3]),distance:[600,950],angle:[70,110],duration:[1300,1900],spread:140});t===1&&Y(e,`VRÅÅL! Publiken hoppar högt av skräck och förtjusning.`),await g(420)}e.root.classList.remove(`roar-shake`),await g(900)}var Yt={rymd:Gt,hav:Kt,saga:qt,djungel:Jt};async function Xt(e,t,n){Mt(e,t.cat.powerShout),Y(e,`Superkraft: ${t.cat.power}!`);let r=Yt[t.cat.group];if(o.power(r?t.cat.group:t.cat.id),r)return r(e,n);switch(t.cat.id){case`rosa`:return Pt(e,n);case`gra`:return Ft(e,n);case`gron`:return It(e,n);case`julgran`:return Lt(e,n);case`nisse`:return Rt(e);case`regnbage`:return zt(e,n);case`silver`:return Ut(e,n);case`guld`:return Wt(e,n);case`rod`:case`orange`:case`gul`:case`bla`:case`lila`:return Bt(e,t.cat,n);case`svart`:case`vit`:case`tiger`:case`trefarg`:case`siames`:case`smoking`:return Ht(e,t.cat,n)}}async function Zt(e,t){let{cat:n,outfit:r}=t,i=r.shoes===`ljusskor`||r.shoes===`maanskor`,a=r.shoes===`raketskor`,c=r.shoes===`molnskor`,l=r.shoes===`solskor`,u=r.shoes===`gummistovlar`,d=i?`hopping`:a?`rocketing`:c?`floating`:`walking`,p=!1,m=r.top===`ljusdrakt`,h=r.head===`julljus-hatt`,_=r.top===`mobildrakt`;e.tag.className=`walk-tag ${G(t.index)}`,e.tag.innerHTML=`<b>${W(t)}</b> ${n.name}`;let v=document.createElement(`div`);v.className=`walker`,v.innerHTML=`
    ${m?`<div class="halo big"></div>`:h?`<div class="halo head"></div>`:``}
    <div class="bobber ${d} ${_?`ringing`:``}">${B(n,r)}</div>`,e.walkLayer.appendChild(v);let y=v.querySelector(`.bobber`);m&&e.dim.classList.add(`on`),Y(e,`Nästa på catwalken: ${W(t)} med ${At(n)}!`),o.meow(n.voice);let te=[],x=[],S=(e,t)=>{t(),te.push(window.setInterval(t,e))};if(i&&S(560,()=>o.boing()),S(1100,()=>Nt(e)),_){let t=0;e.bubble.classList.add(`show`),S(1700,()=>{p?e.bubble.classList.remove(`show`):(o.phoneRing(void 0,2),e.bubble.innerHTML=`<b>Mamma:</b> ${ee[t%ee.length]}`,t+=1)})}if(a&&S(900,()=>o.rocket()),u&&[2800,6e3].forEach(e=>{x.push(window.setTimeout(()=>{(async()=>{let e=document.createElement(`div`);e.className=`puddle`,e.innerHTML=St,v.insertBefore(e,y),await g(300),y.animate([{transform:`translateY(0)`},{transform:`translateY(-150px) scale(.95, 1.06)`,offset:.45},{transform:`translateY(0) scale(1.15, .85)`,offset:.8},{transform:`translateY(0)`}],{duration:700,easing:`ease-in-out`}),await g(560),o.splash(),b(v,{x:250,y:630,count:18,size:e=>24+e%3*10,html:()=>Ct,distance:[90,260],angle:[195,345],duration:[500,850]}),await g(900),e.classList.add(`fade`),await g(400),e.remove()})()},e))}),l&&x.push(window.setTimeout(()=>{(async()=>{o.fire();let t=document.createElement(`div`);t.className=`fire`,t.innerHTML=[[10,10],[40,0],[70,12],[0,45],[35,38],[72,46],[18,72],[55,70],[30,-30],[60,-36]].map(([e,t],n)=>`<div class="flame" style="left:${e}%;top:${t}%;animation-delay:-${n*.07}s">${wt}</div>`).join(``),v.appendChild(t),Y(e,`Det brinner! Solskorna satte eld på kläderna!`),await g(1500),p=!0,y.innerHTML=B(n,{shoes:`solskor`}),y.classList.add(`sooty`),v.querySelector(`.halo`)?.remove(),e.dim.classList.remove(`on`),t.remove(),o.poof(),b(v,{x:250,y:300,count:16,size:e=>50+e%3*20,html:()=>Tt,distance:[60,240],angle:[200,340],duration:[900,1400]}),Y(e,`Kläderna brann upp! Bara solskorna är kvar.`)})()},4900)),r.shoes===`bananskal`){let e=y.querySelector(`svg`);[5e3,6700].forEach((t,n)=>{x.push(window.setTimeout(()=>{o.whoosh(),window.setTimeout(()=>o.boing(),380),e.animate([{transform:`rotate(0deg)`},{transform:`rotate(${n?24:-24}deg) translateY(-30px)`,offset:.25},{transform:`rotate(${n?-16:16}deg)`,offset:.5},{transform:`rotate(${n?8:-8}deg)`,offset:.75},{transform:`rotate(0deg)`}],{duration:900,easing:`ease-in-out`})},t))})}s.forEach((t,n)=>{l&&t===`tail`||x.push(window.setTimeout(()=>Y(e,f[r[t]].quip),1e3+n*1650))});let ne=c?[{transform:`translate(-50%, -440px) scale(.26)`},{transform:`translate(calc(-50% - 60px), -330px) scale(.45)`,offset:.22},{transform:`translate(calc(-50% - 470px), 40px) scale(.85)`,offset:.48},{transform:`translate(calc(-50% + 470px), 30px) scale(.85)`,offset:.76},{transform:`translate(-50%, -120px) scale(1)`}]:[{transform:`translate(-50%, -440px) scale(.26)`},{transform:`translate(calc(-50% - 50px), -350px) scale(.42)`,offset:.28},{transform:`translate(calc(-50% + 40px), -255px) scale(.64)`,offset:.6},{transform:`translate(-50%, -120px) scale(1)`}];c&&(e.walkLayer.classList.add(`above-audience`),x.push(window.setTimeout(()=>o.applause(2.4),3200))),await v.animate(ne,{duration:7600,easing:`linear`,fill:`forwards`}).finished,e.walkLayer.classList.remove(`above-audience`),y.classList.remove(`walking`,`hopping`,`rocketing`,`floating`),y.classList.add(`posing`),Nt(e),Nt(e),o.applause(1.2),await g(900),await Xt(e,t,y),await g(350),e.banner.classList.remove(`show`),Y(e,`Tack, ${At(n)}!`),o.whoosh(),y.classList.remove(`posing`),y.classList.add(d),await v.animate([{transform:`translate(-50%, -120px) scale(1)`},{transform:`translate(calc(-50% + 900px), -180px) scale(.8)`}],{duration:1300,easing:`ease-in`,fill:`forwards`}).finished,te.forEach(e=>window.clearInterval(e)),x.forEach(e=>window.clearTimeout(e)),e.bubble.classList.remove(`show`),e.dim.classList.remove(`on`),v.remove()}async function Qt(e,t,n){e.innerHTML=`
    <section class="catwalk">
      ${dt()}
      <div class="dim"></div>
      <div class="walk-layer"></div>
      <div class="flashes"></div>
      ${ft()}
      <div class="fx-layer"></div>
      <div class="walk-tag"></div>
      <div class="power-banner"></div>
      <div class="mom-bubble" aria-live="polite"></div>
      <div class="commentary" aria-live="polite"></div>
    </section>`;let r=e.querySelector(`.catwalk`),i={root:r,fx:r.querySelector(`.fx-layer`),banner:r.querySelector(`.power-banner`),commentary:r.querySelector(`.commentary`),bubble:r.querySelector(`.mom-bubble`),dim:r.querySelector(`.dim`),tag:r.querySelector(`.walk-tag`),walkLayer:r.querySelector(`.walk-layer`),flashes:r.querySelector(`.flashes`)};o.music(`catwalk`),Y(i,`Mina damer, herrar och katter: välkomna till Julkattens Catwalk!`),await g(2200),Y(i,`Domarna är Renen, Pepparkakan och Tomten. Tomten, sluta äta på Pepparkakan!`),o.crunch(),await g(2800);for(let e=0;e<t.length;e++)e>0&&await g(500),await Zt(i,t[e]);Y(i,`Domarna räknar. Tomten använder fingrarna.`),i.tag.className=`walk-tag`,i.tag.innerHTML=``,await g(1800),n()}function $t(e,t,n){let r=Math.min(10,Math.max(1,t)),i=!1;e.innerHTML=`
    <section class="count-screen">
      <h2>Hur många spelar?</h2>
      <div class="count-row">
        <button class="count-btn" type="button" data-dir="left">${K(`left`)}<span>Färre</span></button>
        <div class="count-num" aria-live="polite"></div>
        <button class="count-btn" type="button" data-dir="right"><span>Fler</span>${K(`right`)}</button>
      </div>
      <p class="count-note"></p>
      <div class="count-chips"></div>
      <button class="start-hint count-go" type="button">Kör! Tryck <kbd class="key wide">Enter</kbd></button>
    </section>`;let a=e.querySelector(`.count-num`),s=e.querySelector(`.count-note`),c=e.querySelector(`.count-chips`),l=()=>{a.textContent=String(r),a.classList.remove(`bump`),a.offsetWidth,a.classList.add(`bump`),s.textContent=r===1?`Du spelar mot datorn.`:`${r} spelare turas om att klä sin katt.`,c.innerHTML=Array.from({length:r},(e,t)=>`<span class="player-chip ${G(t)}">${kt(t)}</span>`).join(``)+(r===1?`<span class="player-chip cpu-chip">Datorn</span>`:``)},u=()=>{i||(i=!0,S(null),window.removeEventListener(`keydown`,d),o.unlock(),o.pick(`bell`),n(r))},d=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())};window.addEventListener(`keydown`,d),e.querySelector(`.count-go`).addEventListener(`click`,u),S(e=>{let t=r+(e===`right`?1:-1);t<1||t>10?o.boing():(r=t,o.tick(),l())}),l()}var X=1200,en=1500;function tn(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`Kunde inte rita katten`)),r.src=e})}function nn(e,t,n,r,i,a){let o=i;do e.font=`${r} ${o}px ${a}`,o-=2;while(e.measureText(t).width>n&&o>16)}function rn(e,t,n,r){e.save(),e.translate(t,n),e.scale(r,1),e.strokeStyle=`#2b1638`,e.lineWidth=5,e.lineJoin=`round`,e.fillStyle=`#1fa35d`;for(let t of[.2,1.2])e.save(),e.rotate(t),e.beginPath(),e.moveTo(0,0),e.bezierCurveTo(30,-30,70,-26,100,0),e.bezierCurveTo(70,26,30,30,0,0),e.fill(),e.stroke(),e.restore();e.fillStyle=`#e5322d`;for(let[t,n]of[[6,4],[28,-6],[14,26]])e.beginPath(),e.arc(t,n,15,0,Math.PI*2),e.fill(),e.stroke();e.restore()}async function an(e,t,n){let r=`"Mountains of Christmas", Georgia, serif`,i=`"Baloo 2", Verdana, sans-serif`;await Promise.all([document.fonts.load(`700 150px ${r}`),document.fonts.load(`800 40px ${i}`),document.fonts.load(`500 30px ${i}`)]);let a=document.createElement(`canvas`);a.width=X,a.height=en;let o=a.getContext(`2d`);if(!o)throw Error(`Canvas saknas`);let c=o.createLinearGradient(0,0,0,en);c.addColorStop(0,`#1b1252`),c.addColorStop(.65,`#5a1c78`),c.addColorStop(1,`#a8284f`),o.fillStyle=c,o.fillRect(0,0,X,en);let l=7,u=()=>(l=l*16807%2147483647,l/2147483647);o.fillStyle=`rgba(255,255,255,.8)`;for(let e=0;e<150;e++)o.beginPath(),o.arc(u()*X,u()*1200,2+u()*5,0,Math.PI*2),o.fill();let d=o.createRadialGradient(X/2,700,60,X/2,700,520);d.addColorStop(0,`rgba(255,226,122,.85)`),d.addColorStop(1,`rgba(255,226,122,0)`),o.fillStyle=d,o.fillRect(0,150,X,1100),o.fillStyle=`#f2f7ff`,o.beginPath(),o.moveTo(0,1090),o.bezierCurveTo(300,1020,800,1120,X,1040),o.lineTo(X,en),o.lineTo(0,en),o.fill();let p=e.outfit.shoes===`solskor`,m=p?rt(e.cat,{size:[760,1e3]}):B(e.cat,e.outfit,{size:[760,1e3]}),ee=await tn(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(m)}`);if(o.drawImage(ee,258,280,684,900),o.strokeStyle=`#ffd23f`,o.lineWidth=16,o.strokeRect(36,36,1128,1428),o.strokeStyle=`#e5322d`,o.lineWidth=6,o.strokeRect(58,58,1084,1384),rn(o,92,92,1),rn(o,1108,92,-1),o.textAlign=`center`,o.textBaseline=`alphabetic`,o.font=`700 170px ${r}`,o.lineJoin=`round`,o.lineWidth=14,o.strokeStyle=`#2b1638`,o.strokeText(`God Jul!`,X/2,225),o.fillStyle=`#ffe27a`,o.fillText(`God Jul!`,X/2,225),o.font=`700 38px ${i}`,o.fillStyle=`#fff`,o.fillText(`från vinnaren av Julkattens Catwalk`,X/2,285),n){o.fillStyle=`#ffd23f`,o.strokeStyle=`#2b1638`,o.lineWidth=7,o.beginPath(),o.roundRect(150,1086,900,78,39),o.fill(),o.stroke(),o.fillStyle=`#2b1638`,o.textAlign=`center`,o.textBaseline=`alphabetic`;let e=`Sprang ${n.meters} meter och hittade ${n.gifts} julklappar`;nn(o,e,840,800,38,i),o.fillText(e,X/2,1138)}o.fillStyle=`#fff6e3`,o.strokeStyle=`#2b1638`,o.lineWidth=7,o.beginPath(),o.roundRect(120,1180,960,240,30),o.fill(),o.stroke(),o.fillStyle=`#b5172f`;let h=p?`${e.cat.name}, som blev en sol`:e.cat.name;nn(o,h,900,800,70,i),o.fillText(h,X/2,1258),o.fillStyle=`#2b1638`;let g=s.map(t=>f[e.outfit[t]].name).join(` · `);return nn(o,g,900,700,36,i),o.fillText(g,X/2,1315),o.font=`500 28px ${i}`,nn(o,e.cat.power,900,500,28,i),o.fillText(e.cat.power,X/2,1355),o.font=`800 30px ${i}`,o.fillStyle=`#14733f`,o.fillText(`${W(e)} · ${t} poäng`,X/2,1398),a}async function on(e,t,n){let r=await an(e,t,n),i=await new Promise(e=>r.toBlob(e,`image/png`));if(!i)throw Error(`Kunde inte skapa bilden`);let a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`julkort-${e.cat.name.toLowerCase().replace(/å/g,`a`).replace(/ä/g,`a`).replace(/ö/g,`o`).replace(/\s+/g,`-`)}.png`,document.body.appendChild(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(a),5e3)}function sn(e,t){return`
    <div class="loser ${G(e.index)}">
      <div class="loser-cloud">${gt}</div>
      <div class="loser-cat">${B(e.cat,e.outfit,{mood:`sad`})}</div>
      <p class="loser-sign">${W(e)}: ${t} poäng</p>
    </div>`}function cn(e,t){return`
    <div class="loser many">
      <div class="loser-cloud">${gt}</div>
      <div class="loser-grid count-${e.length}">
        ${e.map((e,n)=>`
          <div class="mini-loser ${G(e.index)}">
            ${B(e.cat,e.outfit,{mood:`sad`})}
            <span class="mini-sign">${n+2}. ${W(e)}: ${t[n]}</span>
          </div>`).join(``)}
      </div>
    </div>`}async function ln(e,t,n,r,i){let a=t[n.winner],s=n.scores[n.winner].total,c=n.ranking.slice(1).map(e=>t[e]),l=n.ranking.slice(1).map(e=>n.scores[e].total),u=c[0];o.music(null),e.innerHTML=`
    <section class="final">
      ${_t}
      <div class="sleigh-flight">
        <div class="sleigh">
          <div class="reindeer">${ht}</div>
          <svg class="reins" viewBox="0 0 400 120" aria-hidden="true"><path d="M0,90 C120,120 240,20 400,30" fill="none" stroke="#2b1638" stroke-width="7"/><path d="M0,90 C120,120 240,20 400,30" fill="none" stroke="#ffd23f" stroke-width="3"/></svg>
          <div class="sleigh-part">${pt}</div>
          <div class="sleigh-cat">${B(a.cat,a.outfit)}</div>
          <div class="sleigh-part">${mt}</div>
        </div>
      </div>
      ${c.length===1?sn(u,l[0]):cn(c,l)}
      <canvas class="confetti" width="1600" height="900"></canvas>
      <div class="final-banner">
        <p class="final-kicker">Domarna har bestämt…</p>
        <h1 class="final-title"></h1>
      </div>
      <div class="final-actions">
        <button class="action" type="button" data-dir="left">${K(`left`)} Spara julkortet</button>
        ${a.cpu?``:`<button class="action run-action" type="button"><kbd class="key wide">Mellanslag</kbd> Julkatternas springspel</button>`}
        <button class="action" type="button" data-dir="right">Spela igen ${K(`right`)}</button>
      </div>
      <div class="toast" role="status"></div>
    </section>`;let d=e.querySelector(`.final`),f=d.querySelector(`.final-title`),p=d.querySelector(`.final-kicker`),m=d.querySelector(`.toast`);d.classList.add(`stage-loser`),await g(500),p.textContent=c.length===1?`Stackars ${At(u.cat)}…`:`Stackars alla andra katter…`,o.sadTrombone(),window.setTimeout(()=>o.meow(c[c.length-1].cat.voice,!0),2600),await g(3700),d.classList.remove(`stage-loser`),d.classList.add(`stage-winner`),o.fanfare(),o.applause(2.6),p.textContent=c.length===1?`${W(a)} vinner med ${s} poäng mot ${l[0]}!`:`${W(a)} vinner med ${s} poäng! Tvåa: ${W(u)} med ${l[0]}.`,f.textContent=`${a.cat.name} åker i Tomtens släde!`;let ee=y(d.querySelector(`.confetti`));if(await g(2700),a.outfit.shoes===`solskor`){let e=d.querySelector(`.sleigh-cat`);p.textContent=`Oj! Solskorna blir varmare och varmare…`,e.classList.add(`heating`),o.fire(),await g(1700),o.flash(),o.tada(),d.classList.add(`sun-flash`),e.classList.remove(`heating`),e.classList.add(`sun-cat`),e.innerHTML=rt(a.cat),f.textContent=`${a.cat.name} blev en sol!`,p.textContent=`Nu lyser den upp hela julnatten.`,await g(1400)}o.music(`winner`),o.meow(a.cat.voice),d.classList.add(`ready`);let h=e=>{S(null),window.removeEventListener(`keydown`,v),ee(),o.music(null),e()},_=()=>h(()=>i(a,s));function v(e){(e.code===`Space`||e.key===` `)&&(e.preventDefault(),e.repeat||_())}a.cpu||(window.addEventListener(`keydown`,v),d.querySelector(`.run-action`).addEventListener(`click`,_));let b=!1;S(async e=>{if(e===`right`)h(r);else if(!b){b=!0;try{await on(a,s),o.pick(`bell`),m.textContent=`Julkortet är sparat bland dina nedladdningar!`}catch{m.textContent=`Julkortet gick inte att spara. Prova igen!`}m.classList.remove(`show`),m.offsetWidth,m.classList.add(`show`),b=!1}})}var Z=`stroke="${w}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`,un=e=>`<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
  <g class="nisse-leg nl-a"><path d="M50,128 L44,156" stroke="${w}" stroke-width="18" stroke-linecap="round"/><path d="M50,128 L44,156" stroke="#4a4453" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="40" cy="160" rx="14" ry="8" fill="#2b2733" stroke="${w}" stroke-width="4"/></g>
  <g class="nisse-leg nl-b"><path d="M70,128 L76,156" stroke="${w}" stroke-width="18" stroke-linecap="round"/><path d="M70,128 L76,156" stroke="#4a4453" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="80" cy="160" rx="14" ry="8" fill="#2b2733" stroke="${w}" stroke-width="4"/></g>
  <path d="M28,98 L14,118" stroke="${w}" stroke-width="16" stroke-linecap="round"/><path d="M28,98 L14,118" stroke="#8a8f9e" stroke-width="8" stroke-linecap="round"/>
  <path d="M92,98 L106,116" stroke="${w}" stroke-width="16" stroke-linecap="round"/><path d="M92,98 L106,116" stroke="#8a8f9e" stroke-width="8" stroke-linecap="round"/>
  <circle cx="14" cy="120" r="7" fill="#ffd9b8" stroke="${w}" stroke-width="3"/><circle cx="106" cy="118" r="7" fill="#ffd9b8" stroke="${w}" stroke-width="3"/>
  <path d="M28,136 Q24,92 60,88 Q96,92 92,136 Q60,146 28,136Z" fill="#8a8f9e" ${Z}/>
  <path d="M30,120 Q60,128 90,120" fill="none" stroke="#2b2733" stroke-width="8"/>
  <rect x="53" y="117" width="14" height="11" rx="2" fill="#ffd23f" stroke="${w}" stroke-width="2.5"/>
  <circle cx="60" cy="74" r="22" fill="#ffd9b8" ${Z}/>
  <path d="M38,76 Q38,112 60,116 Q82,112 82,76 Q72,90 60,88 Q48,90 38,76Z" fill="#fff" ${Z}/>
  <circle cx="60" cy="80" r="7" fill="#ff8f8f" stroke="${w}" stroke-width="3"/>
  <circle cx="51" cy="70" r="3.2" fill="${w}"/><circle cx="69" cy="70" r="3.2" fill="${w}"/>
  <path d="M45,63 L56,66 M75,63 L64,66" stroke="${w}" stroke-width="3" stroke-linecap="round"/>
  <path d="M34,64 Q36,22 72,6 Q84,2 86,14 Q76,32 86,64 Z" fill="${e}" ${Z}/>
  <rect x="30" y="58" width="60" height="14" rx="7" fill="#fff" ${Z}/>
  <circle cx="86" cy="12" r="9" fill="#fff" ${Z}/>
</svg>`,dn=(e,t)=>`<svg viewBox="0 0 60 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="7" y="24" width="46" height="36" rx="4" fill="${e}" ${Z}/>
  <rect x="4" y="16" width="52" height="12" rx="4" fill="${e}" ${Z}/>
  <rect x="25" y="16" width="10" height="44" fill="${t}" stroke="${w}" stroke-width="3"/>
  <path d="M30,16 C18,2 8,10 16,16 Z M30,16 C42,2 52,10 44,16 Z" fill="${t}" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
</svg>`,fn=`<svg viewBox="0 0 60 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="36" r="30" fill="#ffe27a" opacity=".45"/>
  <rect x="7" y="24" width="46" height="36" rx="4" fill="#f5c518" ${Z}/>
  <rect x="4" y="16" width="52" height="12" rx="4" fill="#ffd23f" ${Z}/>
  <rect x="25" y="16" width="10" height="44" fill="#e5322d" stroke="${w}" stroke-width="3"/>
  <path d="M30,16 C18,2 8,10 16,16 Z M30,16 C42,2 52,10 44,16 Z" fill="#e5322d" stroke="${w}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M30,50 C22,44 20,38 24,35 C27,33 30,35 30,38 C30,35 33,33 36,35 C40,38 38,44 30,50Z" fill="#ff4b7d" stroke="${w}" stroke-width="2"/>
  <polygon points="${A(50,12,7,3,4,0)}" fill="#fff"/>
</svg>`;function pn(e){let t=e;return()=>(t=(t*9301+49297)%233280,t/233280)}var mn=(()=>{let e=pn(7),t=[],n=0;for(;n<1600;){let r=Math.min(1600-n,110+Math.floor(e()*120)),i=130+Math.floor(e()*190),a=420-i,o=[`#2a1b55`,`#33216a`,`#271849`][Math.floor(e()*3)],s=e()<.55,c=s?`<path d="M${n},${a} L${n+r/2},${a-50} L${n+r},${a} Z" fill="${o}"/><path d="M${n+4},${a-2} L${n+r/2},${a-48} L${n+r-4},${a-2} L${n+r/2},${a-36} Z" fill="#e9f1ff"/>`:`<rect x="${n}" y="${a-8}" width="${r}" height="10" rx="5" fill="#e9f1ff"/>`,l=e()<.6?`<rect x="${n+r*.68}" y="${a-(s?54:40)}" width="18" height="44" fill="${o}"/><rect x="${n+r*.68-3}" y="${a-(s?58:44)}" width="24" height="8" rx="3" fill="#e9f1ff"/>`:``,u=[];for(let t=a+24;t<400;t+=44)for(let i=n+16;i<n+r-30;i+=38)e()<.45&&u.push(`<rect x="${i}" y="${t}" width="18" height="22" rx="3" fill="${e()<.8?`#ffd76a`:`#ffb04a`}"/>`);t.push(`${l}<rect x="${n}" y="${a}" width="${r}" height="${i+10}" fill="${o}"/>${c}${u.join(``)}`),n+=r}return`<svg viewBox="0 0 1600 430" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${t.join(``)}</svg>`})(),hn=(()=>{let e=[];for(let t=0;t<5;t++){let n=40+t*34,r=t%2?25:0;for(let t=-50+r;t<1650;t+=50)e.push(`<path d="M${t},${n} q25,30 50,0" fill="none" stroke="#6e2626" stroke-width="4"/>`)}let t=`M0,26`;for(let e=0;e<1600;e+=200)t+=` Q${e+50},4 ${e+100},18 Q${e+150},32 ${e+200},26`;let n=Array.from({length:32},(e,t)=>`M${t*50+18},34 l6,${10+t%3*6} l6,-${10+t%3*6}`).join(` `);return`<svg viewBox="0 0 1600 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="20" width="1600" height="200" fill="#a8423f"/>
    ${e.join(``)}
    <path d="${n}" fill="#dff4ff"/>
    <path d="${t} L1600,40 L0,40 Z" fill="#f4f8ff"/>
    <path d="${t}" fill="none" stroke="${w}" stroke-width="5"/>
  </svg>`})(),gn=(e,t,n,r,i=`#f4f8ff`)=>{let a=n*.42,o=[0,.3,.58].map((o,s)=>{let c=t-n+o*n,l=c+n*(.48-s*.04),u=a*(.55+o*.75);return`<path d="M${e},${c} L${e+u},${l} L${e-u},${l} Z" fill="${r}"/><path d="M${e},${c} L${e+u*.45},${c+(l-c)*.45} Q${e},${c+(l-c)*.3} ${e-u*.45},${c+(l-c)*.45} Z" fill="${i}"/>`});return`<rect x="${e-n*.04}" y="${t-n*.06}" width="${n*.08}" height="${n*.08}" fill="#3b2418"/>${o.join(``)}`},_n=(e,t)=>e(t-1600)+e(t)+e(t+1600),vn=(()=>{let e=pn(11),t=[],n=[];for(let n=30;n<1560;n+=60+e()*50){let r=150+e()*90;t.push(_n(e=>gn(e,330,r,`#1d3d4f`,`#c7d8ee`),n))}for(let t=90;t<1500;t+=120+e()*110){let r=210+e()*110;n.push(_n(e=>gn(e,430,r,`#16573d`),t))}return`<svg viewBox="0 0 1600 430" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,330 C300,300 500,340 800,320 C1100,300 1300,340 1600,330 L1600,430 L0,430 Z" fill="#c7d8ee"/>
    ${t.join(``)}
    <path d="M0,400 C300,380 520,410 800,396 C1080,382 1300,410 1600,400 L1600,430 L0,430 Z" fill="#e6efff"/>
    ${n.join(``)}
  </svg>`})(),yn=(()=>{let e=`M0,26`;for(let t=0;t<1600;t+=400)e+=` C${t+100},6 ${t+200},6 ${t+200},20 C${t+260},34 ${t+340},30 ${t+400},26`;let t=Array.from({length:16},(e,t)=>`<ellipse cx="${t*100+30}" cy="${70+t%2*18}" rx="9" ry="5" fill="#bccfe9"/>`).join(``);return`<svg viewBox="0 0 1600 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${e} L1600,220 L0,220 Z" fill="#f4f8ff"/>
    <path d="M0,120 C300,104 500,134 800,118 C1100,102 1300,134 1600,120 L1600,220 L0,220 Z" fill="#dbe7fb"/>
    ${t}
    <path d="${e}" fill="none" stroke="${w}" stroke-width="5"/>
  </svg>`})(),bn=(()=>{let e=pn(23),t=Array.from({length:33},(e,t)=>`<path d="M${t*50},-330 V430" stroke="#6b3d22" stroke-width="3"/>`).join(``),n=[];for(let t=40;t<1600;t+=400){n.push(`<rect x="${t}" y="70" width="150" height="170" rx="10" fill="#1d2a6b" stroke="${w}" stroke-width="6"/>
      <path d="M${t+75},70 V240 M${t},155 H${t+150}" stroke="${w}" stroke-width="6"/>
      <circle cx="${t+40}" cy="110" r="5" fill="#fff"/><circle cx="${t+110}" cy="100" r="4" fill="#fff"/><circle cx="${t+100}" cy="200" r="5" fill="#fff"/><circle cx="${t+30}" cy="190" r="4" fill="#fff"/>
      <path d="M${t+4},232 Q${t+75},210 ${t+146},232 L${t+146},236 L${t+4},236 Z" fill="#f4f8ff"/>`);let r=t+200;n.push(`<rect x="${r}" y="250" width="170" height="14" fill="#a8693c" stroke="${w}" stroke-width="4"/>`),n.push(`<rect x="${r+10}" y="200" width="44" height="50" rx="4" fill="${[`#e5322d`,`#2a6fe1`,`#2e9a52`][Math.floor(e()*3)]}" stroke="${w}" stroke-width="4"/><path d="M${r+32},200 V250" stroke="#ffd23f" stroke-width="7"/>`),n.push(`<circle cx="${r+88}" cy="226" r="24" fill="#ffd23f" stroke="${w}" stroke-width="4"/><path d="M${r+64},226 H${r+112}" stroke="#e5322d" stroke-width="6"/>`),n.push(`<path d="M${r+124},250 L${r+124},214 L${r+140},204 L${r+156},214 L${r+156},250 Z" fill="#9b5cff" stroke="${w}" stroke-width="4"/><circle cx="${r+140}" cy="196" r="9" fill="#ffd9b8" stroke="${w}" stroke-width="3"/>`),n.push(`<path d="M${t+300},-330 V40" stroke="${w}" stroke-width="4"/><path d="M${t+280},40 h40 l10,22 h-60 Z" fill="#2e9a52" stroke="${w}" stroke-width="4"/><circle cx="${t+300}" cy="70" r="10" fill="#ffe27a"/>`)}return`<svg viewBox="0 -330 1600 760" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="-330" width="1600" height="760" fill="#8a4f2b"/>${t}
    <g transform="translate(0 -300)"><path d="M0,20 ${Array.from({length:16},(e,t)=>`Q${t*100+50},70 ${t*100+100},20`).join(` `)}" fill="none" stroke="#1f7a3f" stroke-width="14"/>${Array.from({length:16},(e,t)=>`<circle cx="${t*100+50}" cy="45" r="8" fill="${[`#e5322d`,`#ffd23f`,`#2a6fe1`][t%3]}" stroke="${w}" stroke-width="3"/>`).join(``)}</g>
    ${n.join(``)}
    <rect y="380" width="1600" height="50" fill="#5e341c"/>
  </svg>`})(),xn=`<svg viewBox="0 0 1600 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="20" width="1600" height="200" fill="#b77a45"/>
    <path d="M0,80 H1600 M0,120 H1600 M0,150 H1600 M0,190 H1600" stroke="#6b3d22" stroke-width="3"/>${Array.from({length:20},(e,t)=>`<path d="M${t*80+t%2*40},80 v40 M${t*80+40-t%2*40},150 v40" stroke="#6b3d22" stroke-width="3"/>`).join(``)}
    <rect y="20" width="1600" height="44" fill="#c62a2f"/>
    <path d="M0,30 H1600 M0,54 H1600" stroke="#ffd23f" stroke-width="4" stroke-dasharray="18 12"/>
    <path d="M0,20 H1600" stroke="${w}" stroke-width="5"/>
  </svg>`,Sn=(()=>{let e=pn(31),t=[];for(let n=120;n<1500;n+=300+e()*160){let r=180+e()*140,i=220+e()*100;t.push(_n(e=>`<path d="M${e-i},430 L${e},${430-r} L${e+i},430 Z" fill="#3c4f86"/><path d="M${e-i*.3},${430-r*.7} L${e},${430-r} L${e+i*.3},${430-r*.7} L${e+i*.12},${430-r*.62} L${e},${430-r*.7} L${e-i*.14},${430-r*.6} Z" fill="#eef4ff"/>`,n))}let n=[];for(let t=60;t<1540;t+=170+e()*160){let r=120+e()*60;n.push(_n(e=>gn(e,420,r,`#123f33`,`#dbe7fb`),t))}return`<svg viewBox="0 0 1600 430" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    ${t.join(``)}
    <path d="M0,405 C400,395 1200,415 1600,405 L1600,430 L0,430 Z" fill="#dbe7fb"/>
    ${n.join(``)}
  </svg>`})(),Cn=`<svg viewBox="0 0 1600 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="22" width="1600" height="198" fill="#bfe6fb"/>
    <rect y="120" width="1600" height="100" fill="#9fd3f2"/>
    ${Array.from({length:8},(e,t)=>{let n=t*200+60;return`<path d="M${n},70 l30,26 l-12,28 l40,30 M${n+30},96 l38,-10" fill="none" stroke="#8fc3e6" stroke-width="3"/>`}).join(``)}${Array.from({length:8},(e,t)=>`<path d="M${t*200+130},60 l60,0 M${t*200+110},76 l30,0" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>`).join(``)}
    <path d="M0,22 Q100,12 200,22 T400,22 T600,22 T800,22 T1000,22 T1200,22 T1400,22 T1600,22 L1600,30 L0,30 Z" fill="#f4f8ff"/>
    <path d="M0,22 Q100,12 200,22 T400,22 T600,22 T800,22 T1000,22 T1200,22 T1400,22 T1600,22" fill="none" stroke="${w}" stroke-width="5"/>
  </svg>`,wn=e=>`<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
  <g class="sled-speed" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M172,70 h22 M176,92 h30 M172,114 h20"/></g>
  <path d="M40,104 V120 M130,104 V120" stroke="${w}" stroke-width="7"/>
  <path d="M8,104 Q4,124 26,124 L156,124 Q166,124 164,112" fill="none" stroke="${w}" stroke-width="10" stroke-linecap="round"/>
  <path d="M8,104 Q4,124 26,124 L156,124 Q166,124 164,112" fill="none" stroke="#c8ccd6" stroke-width="5" stroke-linecap="round"/>
  <rect x="14" y="86" width="150" height="22" rx="8" fill="#c62a2f" ${Z}/>
  <path d="M30,96 H150" stroke="#ffd23f" stroke-width="4" stroke-dasharray="10 8"/>
  <path d="M60,88 Q56,52 88,48 Q120,52 116,88 Z" fill="#8a8f9e" ${Z}/>
  <path d="M62,72 L34,80" stroke="${w}" stroke-width="14" stroke-linecap="round"/><path d="M62,72 L34,80" stroke="#8a8f9e" stroke-width="7" stroke-linecap="round"/>
  <circle cx="32" cy="80" r="7" fill="#ffd9b8" stroke="${w}" stroke-width="3"/>
  <circle cx="86" cy="36" r="19" fill="#ffd9b8" ${Z}/>
  <path d="M67,38 Q67,68 86,70 Q105,68 105,38 Q96,50 86,48 Q76,50 67,38Z" fill="#fff" ${Z}/>
  <circle cx="80" cy="42" r="6" fill="#ff8f8f" stroke="${w}" stroke-width="3"/>
  <circle cx="74" cy="32" r="3" fill="${w}"/><circle cx="90" cy="32" r="3" fill="${w}"/>
  <path d="M68,26 L78,29 M96,26 L86,29" stroke="${w}" stroke-width="3" stroke-linecap="round"/>
  <path d="M66,28 Q70,0 104,-4 Q132,0 140,14 Q118,10 106,28 Z" fill="${e}" ${Z}/>
  <rect x="62" y="22" width="50" height="12" rx="6" fill="#fff" ${Z}/>
  <circle cx="142" cy="14" r="8" fill="#fff" ${Z}/>
</svg>`,Tn=`<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="20" fill="#f4f8ff" stroke="${w}" stroke-width="4"/>
  <circle cx="18" cy="18" r="6" fill="#fff"/><path d="M14,32 q8,6 18,0" fill="none" stroke="#c7d8ee" stroke-width="4" stroke-linecap="round"/>
</svg>`,En=`<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">
  <path d="M6,108 C4,60 40,40 70,50 C84,14 140,14 150,48 C176,40 198,70 194,108 Z" fill="#f4f8ff" ${Z}/>
  <path d="M30,92 q20,-10 40,0 M120,86 q20,-10 40,0" fill="none" stroke="#c7d8ee" stroke-width="5" stroke-linecap="round"/>
</svg>`,Dn={raketskor:{power:`raket`,text:`Håll in mellanslag i luften så flyger katten en stund.`},molnskor:{power:`moln`,text:`Håll in mellanslag så svävar katten sakta ner efter hoppet.`},maanskor:{power:`maan`,text:`Höga, långsamma månhopp.`},gummistovlar:{power:`gummi`,text:`Spring rakt ner i vattenpölarna för superstudsar!`},ljusskor:{power:`studs`,text:`Katten studsar hela tiden och kan studsa på nissarnas huvuden.`},solskor:{power:`sol`,text:`Solskenet skrämmer bort nissen du krockar med. Sedan laddas det igen.`},bananskal:{power:`banan`,text:`Ibland halkar katten och åker supersnabbt. Då ramlar nissarna omkull!`},gympaskor:{power:`dubbel`,text:`Dubbelhopp! Tryck mellanslag en gång till uppe i luften.`},renhovar:{power:`dubbel`,text:`Renhopp! Tryck mellanslag en gång till uppe i luften, som Rudolf.`},guldskor:{power:`magnet`,text:`Julklapparna dras till katten som till en magnet.`},fotbollsskor:{power:`spark`,text:`Katten sparkar bort snöbollarna.`}};function On(e){let t=Dn[e.shoes];return t?{...t,name:f[e.shoes]?.name??`Skorna`}:null}var kn={rymd:{text:`Katten svävar tyngdlöst högt över nissarna.`,treat:`float`,fx:`stars`,float:!0},hav:{text:`En jättevåg sköljer bort alla nissar.`,treat:`wash`,fx:`wave`},saga:{text:`Alla nissar blir grodor som du kan samla.`,treat:`frog`,fx:`magic`},djungel:{text:`Vrålet får nissarna att springa därifrån.`,treat:`flee`,fx:`roar`},farg:{text:`Färgbomben får nissarna att halka omkull.`,treat:`bonk`,fx:`paint`},vanlig:{text:`Garnnystanet är så gulligt att nissarna slutar jaga katten.`,treat:`dance`,fx:`yarn`}},An={rosa:{text:`Katten snurrar som en snurra och knuffar bort alla nissar.`,treat:`bonk`,fx:`spin`},gra:{text:`Nissarna springer iväg efter rökta räkor.`,treat:`flee`,fx:`shrimp`},julgran:{text:`Barr och glitter får nissarna att börja dansa.`,treat:`dance`,fx:`glitter`},nisse:{text:`Nissarna blir så glada av julgröten att de slutar jaga katten.`,treat:`dance`,fx:`porridge`},regnbage:{text:`Katten springer på en regnbåge högt över nissarna.`,treat:`dance`,fx:`rainbow`,float:!0},silver:{text:`Discokulan får alla nissar att dansa.`,treat:`dance`,fx:`disco`},guld:{text:`Det regnar julklappar!`,treat:`dance`,fx:`coins`,giftRain:!0},gron:{text:`Katten ser ut som en julklapp, så nissarna springer rakt förbi.`,treat:`ignore`,fx:`camo`}};function jn(e){let t=An[e.id]??kn[e.group]??kn.vanlig,n=!An[e.id]&&!!kn[e.group]&&[`rymd`,`hav`,`saga`,`djungel`].includes(e.group);return{...t,name:e.powerName,shout:e.powerShout,sound:n?e.group:e.id}}var Mn=`julkattens-catwalk.topplista`,Nn=10,Pn=e=>{let t=e;return!!t&&typeof t.name==`string`&&typeof t.catId==`string`&&typeof t.meters==`number`&&typeof t.gifts==`number`},Fn=(e,t)=>t.meters-e.meters||t.gifts-e.gifts||e.at-t.at;function In(){try{let e=window.localStorage.getItem(Mn),t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(Pn).sort(Fn).slice(0,Nn):[]}catch{return[]}}function Ln(e){let t=[...In(),e].sort(Fn).slice(0,Nn),n=t.indexOf(e);try{window.localStorage.setItem(Mn,JSON.stringify(t))}catch{}return{list:t,place:n>=0?n:null}}var Rn=742,Q={x:250,w:190,h:250},zn=Q.h*.94,Bn=3e3,Vn=980,Hn=.42,Un=.28,Wn=.13,Gn=.08,Kn=470,qn=440,Jn=860,Yn=90,Xn=5,Zn=40,Qn=3,$n=1.4,er=1.1,tr=.55,nr=.92,rr=1500,ir=430,ar=7,or=1.6,sr=1.6,cr=380,lr=330,ur=`<div class="run-stars"></div>`,dr=[{name:`Hustaken`,sky:`linear-gradient(#120b38 0%, #2a1a66 55%, #6a2f7e 100%)`,far:mn,ground:hn,extra:`${ur}<div class="run-moon"></div>`},{name:`Snöiga granskogen`,sky:`linear-gradient(#0b1f3f 0%, #1f4a7a 60%, #6d93c4 100%)`,far:vn,ground:yn,extra:ur},{name:`Tomtens verkstad`,sky:`#8a4f2b`,far:bn,tall:!0,ground:xn,extra:``},{name:`Isiga sjön`,sky:`linear-gradient(#050f26 0%, #0e3350 60%, #2a6b7c 100%)`,far:Sn,ground:Cn,extra:`${ur}<div class="run-aurora"><i></i><i></i><i></i></div>`}],fr=2e3,pr=300,mr={walker:{w:96,h:136},hopper:{w:96,h:136},sled:{w:170,h:130},thrower:{w:200,h:180},ball:{w:44,h:44},gift:{w:54,h:58},gold:{w:54,h:58},frog:{w:80,h:68},puddle:{w:180,h:46}},hr=[`#e5322d`,`#c2185b`,`#2e9a52`,`#2a6fe1`],gr=[[`#e5322d`,`#ffd23f`],[`#2a6fe1`,`#ffffff`],[`#2e9a52`,`#e5322d`],[`#9b5cff`,`#ffd23f`],[`#ff8a1c`,`#2e9a52`]],_r=e=>e===`walker`||e===`hopper`||e===`sled`,vr=e=>e===`gift`||e===`gold`||e===`frog`,yr=(e,t)=>e.left<t.right&&e.right>t.left&&e.top<t.bottom&&e.bottom>t.top,br=e=>e[Math.floor(Math.random()*e.length)],xr=(e,t)=>{switch(e){case`wave`:return Et;case`magic`:return Dt;case`roar`:return Ot(`#2e9a52`);case`spin`:return U(`#ff6bd6`);case`shrimp`:return it;case`glitter`:return U(`#3fdc7c`);case`porridge`:return ot;case`disco`:return bt;case`coins`:return xt;case`paint`:return vt(t);case`camo`:return at;case`yarn`:return yt(`#ff4b7d`);case`rainbow`:return`<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="9"><path d="M8,58 A42,42 0 0 1 92,58" stroke="#ff4b4b"/><path d="M17,58 A33,33 0 0 1 83,58" stroke="#ffd93d"/><path d="M26,58 A24,24 0 0 1 74,58" stroke="#3fdc7c"/><path d="M35,58 A15,15 0 0 1 65,58" stroke="#45a7ff"/></g></svg>`;default:return U(`#ffd23f`)}},Sr=`<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg"><path d="M20,48 C2,48 4,26 22,26 C26,8 56,6 62,22 C74,10 100,16 98,32 C116,32 116,48 100,48 Z" fill="#fff" stroke="#2b1638" stroke-width="4"/></svg>`;function Cr(e,t,n,r){let i=On(t.outfit),a=jn(t.cat),s=e=>i?.power===e,c=document.getElementById(`stage`),u=()=>Math.max(0,((c?.offsetWidth??1600)-1600)/2),d=u(),f=()=>d;e.innerHTML=`
    <section class="runner">
      <div class="run-backs"></div>
      <div class="run-things"></div>
      <div class="run-cat ${s(`sol`)?`sunny`:``}">
        <div class="run-flame">${wt}</div>
        <div class="run-glide">${Sr}</div>
        <div class="bobber walking">${B(t.cat,t.outfit)}</div>
      </div>
      <div class="run-grounds"></div>
      <div class="run-fx"></div>
      <div class="run-hud">
        <div class="run-hearts">${Array.from({length:Qn},()=>`<span class="run-heart">${st}</span>`).join(``)}</div>
        <div class="run-meters"><b>0</b> m</div>
        <div class="run-gifts">${dn(`#e5322d`,`#ffd23f`)}<b>0</b></div>
      </div>
      <button class="run-super" type="button" data-dir="right" aria-label="Superkraft: ${a.name}">
        <span class="rs-ring"><span class="rs-icon">${xr(a.fx,t.cat.fur)}</span></span>
        <span class="rs-label">${a.name}</span>
      </button>
      <div class="run-banner" aria-live="polite"></div>
      <div class="run-shout"></div>
      <div class="run-panel run-start">
        <h2>Julkatternas springspel</h2>
        <p>Hoppa över nissarna och samla julklappar!</p>
        <p class="run-keys"><kbd class="key wide">Mellanslag</kbd> hoppar. Håll in för ett högre hopp.</p>
        ${i?`<p class="run-keys run-shoe"><b>${i.name}:</b> ${i.text}</p>`:``}
        <p class="run-keys run-superinfo"><b>${a.name}:</b> ${a.text} Samla 15 julklappar och tryck ${K(`left`)} eller ${K(`right`)}<span class="touch-only">, eller tryck på den runda knappen</span>.</p>
        <p class="run-keys">Du har tre hjärtan. Guldjulklappar ger tillbaka ett hjärta.</p>
        <button class="start-hint" type="button" data-run="go">Tryck <kbd class="key wide">Mellanslag</kbd> för att springa</button>
      </div>
      <canvas class="confetti" width="1600" height="900"></canvas>
      <div class="toast" role="status"></div>
    </section>`;let p=e.querySelector(`.runner`),m=p.querySelector(`.run-backs`),ee=p.querySelector(`.run-grounds`),h=p.querySelector(`.run-things`),_=p.querySelector(`.run-fx`),v=p.querySelector(`.run-cat`),x=v.querySelector(`.bobber`),ne=[...p.querySelectorAll(`.run-heart`)],re=p.querySelector(`.run-meters b`),ie=p.querySelector(`.run-gifts b`),ae=p.querySelector(`.run-super`),oe=p.querySelector(`.rs-ring`),C=p.querySelector(`.rs-label`),se=p.querySelector(`.run-banner`),ce=p.querySelector(`.run-shout`),le=p.querySelector(`.toast`),ue=p.querySelector(`.confetti`),w=qn,T=Jn,E=0,D=0,O=0,k=!0,A=!1,j=0,M=0,de=0,N=Qn,P=0,fe=0,pe=900,me=-1,he=!1,ge=!1,_e=0,ve=0,ye=null,be=[],xe=er,Se=0,Ce=0,F=!1,we=s(`sol`),Te=0,Ee=6+Math.random()*5,De=0,I=0,L=0,Oe=0,ke=null,Ae=[],je=-1,Me=e=>{se.textContent=e,se.classList.remove(`show`),se.offsetWidth,se.classList.add(`show`)},Ne=(e,t)=>{je=e;let n=dr[e%dr.length],r=Math.floor(e/dr.length);T=Jn+r*Yn;let i=document.createElement(`div`);i.className=`run-back ${t?`entering`:``}`,i.innerHTML=`<div class="run-sky" style="background:${n.sky}">${n.extra}</div>
      <div class="run-layer run-far ${n.tall?`tall`:``}"><div>${n.far}</div><div>${n.far}</div><div>${n.far}</div></div>`;let a=document.createElement(`div`);a.className=`run-ground ${t?`entering`:``}`,a.innerHTML=`<div class="run-layer run-floor"><div>${n.ground}</div><div>${n.ground}</div><div>${n.ground}</div></div>`,m.appendChild(i),ee.appendChild(a);let s={back:i,ground:a,far:i.querySelector(`.run-far`),groundLayer:a.querySelector(`.run-floor`)},c=Ae;Ae=[...Ae,s],t&&(i.offsetWidth,i.classList.remove(`entering`),a.classList.remove(`entering`),window.setTimeout(()=>{c.forEach(e=>{e.back.remove(),e.ground.remove()}),Ae=Ae.filter(e=>!c.includes(e))},1400),Me(r>0&&e%dr.length===0?`Varv ${r+1}! Nu går det fortare!`:n.name),o.pick(`bell`))};Ne(0,!1);let R=(e,t,n,r={})=>{let i=document.createElement(`div`);i.className=`run-thing ${e}`,i.innerHTML=e===`walker`||e===`hopper`?un(br(hr)):e===`sled`?wn(br(hr)):e===`thrower`?`<div class="thrower-nisse">${un(br(hr))}</div><div class="thrower-drift">${En}</div>`:e===`ball`?Tn:e===`gold`?fn:e===`frog`?Dt:e===`puddle`?St:dn(...br(gr)),h.appendChild(i);let a={kind:e,el:i,x:t,lift:n,vx:0,amp:0,period:1,t:Math.random()*2,gone:!1,harmless:e===`thrower`||e===`puddle`,balls:0,wait:0,pulled:!1,...r};return be.push(a),a},Pe=(e,t,n=72)=>{let r=N<Qn&&Math.random()<.12?Math.floor(t.length/2):-1;t.forEach((t,i)=>R(i===r?`gold`:`gift`,e+i*n,t))},Fe=()=>{let e=E/Zn,t=w*1.05,n=w*(e<100?2.5:e<400?2.1:1.75),r=t+Math.random()*(n-t),i=fr;if(e>15&&Math.random()<.3)return Pe(i,br([[110,110,110,110],[270,290,300,290,270],[400,420,400]])),r*.7;let a=[[`walker`,1]];e>150&&a.push([`hopper`,.55]),e>pr&&a.push([`sled`,.5]),e>pr*2&&a.push([`thrower`,.45]);let o=Math.random()*a.reduce((e,[,t])=>e+t,0),c=a.find(([,e])=>(o-=e)<0)?.[0]??`walker`;if(s(`gummi`)&&c!==`thrower`&&Math.random()<.55&&R(`puddle`,1670,0),c===`hopper`)R(`hopper`,i,0,{amp:90+Math.random()*40,period:.95+Math.random()*.3});else if(c===`sled`)return R(`sled`,i,0,{vx:200+Math.random()*80}),r*1.15;else if(c===`thrower`)return R(`thrower`,i,0,{balls:e>pr*3&&Math.random()<.5?2:1}),r*1.2;else R(`walker`,i,0,{vx:50+Math.random()*(60+Math.min(80,e/10))});return Math.random()<.4&&Pe(1890,[250,320,350,320,250]),r},Ie=()=>746-zn-D,Le=()=>{let e=Ie();return{left:Q.x+Q.w*.3,right:Q.x+Q.w*.7,top:e+Q.h*.24,bottom:e+Q.h*.9}},Re=e=>{let{h:t}=mr[e.kind];switch(e.kind){case`walker`:case`hopper`:case`frog`:return 748-t-e.lift;case`sled`:case`thrower`:return 750-t;case`puddle`:return 722;default:return Rn-e.lift-t/2}},z=e=>{let t=Re(e),{w:n,h:r}=mr[e.kind];return e.kind===`walker`||e.kind===`hopper`?{left:e.x+n*.24,right:e.x+n*.76,top:t+r*.14,bottom:t+r*.95}:e.kind===`sled`?{left:e.x+14,right:e.x+160,top:t+44,bottom:t+r-4}:e.kind===`puddle`?{left:e.x+40,right:e.x+n-40,top:t,bottom:t+40}:{left:e.x+6,right:e.x+n-6,top:t+6,bottom:t+r-6}},ze=()=>ne.forEach((e,t)=>e.classList.toggle(`lost`,t>=N)),Be=()=>{let e=I>=15&&L<=0;oe.style.setProperty(`--p`,String(L>0?L/6*100:I/15*100)),ae.classList.toggle(`ready`,e),ae.classList.toggle(`active`,L>0),C.innerHTML=e?`<b class="touch-only">Tryck här!</b><span class="desk-only">${K(`left`)} eller ${K(`right`)}</span>`:a.name},Ve=e=>{ce.textContent=e,ce.classList.remove(`show`),ce.offsetWidth,ce.classList.add(`show`)},He=e=>{let t=document.createElement(`div`);t.className=`run-pop`,t.textContent=e,t.style.left=`${Q.x+Q.w/2}px`,t.style.top=`${Ie()+20}px`,_.appendChild(t),window.setTimeout(()=>t.remove(),1e3)},Ue=(e,t)=>{e.gone=!0,window.setTimeout(()=>e.el.remove(),t)},We=e=>{e.el.classList.add(`taken`),Ue(e,400),e.kind===`gold`?(P+=5,I+=5,N<Qn&&(N+=1),ze(),o.heart()):(P+=1,I+=1,e.kind===`frog`?o.boing():o.gift()),I>=15&&I-(e.kind===`gold`?5:1)<15&&L<=0&&(o.tada(),Ve(`Superkraften är laddad!`)),I=Math.min(I,15),ie.textContent=String(P),Be()},Ge=(e,t)=>{if(t!==`ignore`){if(e.kind===`ball`)e.el.classList.add(`popped`),Ue(e,400);else switch(t){case`bonk`:case`float`:case`wash`:e.el.classList.add(t===`bonk`?`bonked`:t===`float`?`floataway`:`washed`),Ue(e,1300);break;case`flee`:e.harmless=!0,e.el.classList.add(`fleeing`),e.vx=-(w+520);break;case`frog`:{let t=Re(e);te(_,e.x+mr[e.kind].w/2,t+mr[e.kind].h/2),e.el.remove(),e.gone=!0,R(`frog`,e.x,0,{amp:40,period:.5});break}case`dance`:e.harmless=!0,e.vx=0,e.el.classList.add(`dancing`)}}},Ke=e=>{e.el.classList.add(e.kind===`ball`?`popped`:`bonked`),Ue(e,700),--N,fe=$n,ze(),o.hurt(),v.classList.remove(`hurt`),v.offsetWidth,v.classList.add(`hurt`),p.classList.remove(`bump`),p.offsetWidth,p.classList.add(`bump`),N<=0&&ft()},qe=(e,t,n)=>{L>0?Ge(e,a.treat):De>0?(Ge(e,`bonk`),o.boing()):e.kind===`ball`&&s(`spark`)?(e.el.classList.add(`kicked`),Ue(e,800),o.boing(),He(`Spark!`)):s(`studs`)&&e.kind!==`ball`&&O<0&&t.bottom-n.top<55?(Ge(e,`bonk`),O=Vn*1.05,F=!1,o.boing(),He(`Studs!`)):fe>0||(we?(Ge(e,e.kind===`ball`?`bonk`:`flee`),we=!1,Te=ar,v.classList.remove(`sunny`),o.flash(),He(`Solsken!`)):Ke(e))},Je=()=>{let e=document.createElement(`div`);e.className=`run-power fx-${a.fx}`,_.appendChild(e);let n=Q.x+Q.w/2,r=Ie()+Q.h/2,i=[],s=(e,t)=>{t(),i.push(window.setInterval(t,e))},c=null,l=(t,n,r=`twinkle`)=>{e.innerHTML+=Array.from({length:n},(e,n)=>`<span class="${r}" style="left:${Math.round(Math.random()*1560)}px;top:${Math.round(Math.random()*640)}px;animation-delay:-${(Math.random()*1.2).toFixed(2)}s">${t(n)}</span>`).join(``)};switch(a.fx){case`stars`:l(e=>U(e%2?`#ffd23f`:`#ffffff`),26);break;case`magic`:l(e=>U([`#c9b8ff`,`#ff8ac4`,`#ffffff`][e%3]),30),v.classList.add(`magic`);break;case`wave`:e.innerHTML=`<div class="fx-wave-body">${Et}</div>`,o.splash();break;case`roar`:p.classList.add(`roar-shake`),i.push(window.setTimeout(()=>p.classList.remove(`roar-shake`),900)),s(500,()=>b(_,{x:n+60,y:r-40,count:8,size:54,html:e=>Ot([`#2e9a52`,`#5cc86a`,`#1f7a3f`][e%3]),angle:[-60,30],distance:[300,900],duration:[900,1400]}));break;case`spin`:v.classList.add(`spinning`);break;case`shrimp`:s(700,()=>b(_,{x:n,y:r,count:4,size:90,html:()=>it,angle:[-40,10],distance:[700,1200],duration:[1100,1600]}));break;case`glitter`:case`disco`:c=y(ue),a.fx===`disco`&&(e.innerHTML=`<div class="fx-disco-ball">${bt}</div><div class="fx-disco-light"></div>`);break;case`porridge`:e.innerHTML=`<div class="fx-bowl">${ot}</div>`,s(600,()=>b(_,{x:800,y:260,count:5,size:44,html:()=>st,angle:[180,360],distance:[120,420],duration:[900,1400]}));break;case`rainbow`:e.innerHTML=`<div class="fx-rainbow"></div>`;break;case`coins`:s(300,()=>b(_,{x:200+Math.random()*1200,y:-30,count:4,size:40,html:()=>xt,angle:[70,110],distance:[500,900],duration:[1e3,1500],spread:300}));break;case`paint`:{let i=t.cat.fur;e.innerHTML=`<div class="fx-tint" style="background:${i}"></div>`,b(_,{x:n,y:r,count:26,size:e=>50+e%4*20,html:()=>vt(i),distance:[200,1100],duration:[700,1200]});break}case`camo`:v.classList.add(`camo`);break;case`yarn`:e.innerHTML=`<div class="fx-yarn">${yt(t.cat.fur===`#ffffff`?`#ff6bd6`:`#ff4b7d`)}</div>`,s(700,()=>b(_,{x:n,y:r-60,count:4,size:40,html:()=>st,angle:[230,310],distance:[120,360],duration:[900,1300]}))}return()=>{i.forEach(e=>{window.clearInterval(e),window.clearTimeout(e)}),c?.(),p.classList.remove(`roar-shake`),v.classList.remove(`magic`,`spinning`,`camo`),e.classList.add(`ending`),window.setTimeout(()=>e.remove(),500)}},Ye=()=>{if(!(!he||ge||L>0||I<15)){if(I=0,L=6,Oe=0,o.power(a.sound),Ve(a.shout),ke=Je(),a.float){k=!1,O=0;for(let e=0;e<12;e++)R(`gift`,fr+e*110,370+Math.sin(e*.8)*30)}if(a.giftRain)for(let e=0;e<24;e++)R(e%8==4?`gold`:`gift`,fr+e*80,100+e%3*90);for(let e of be)!e.gone&&!e.harmless&&(_r(e.kind)||e.kind===`ball`)&&e.x<1600+f()&&Ge(e,a.treat);Be()}},Xe=()=>{L=0,ke?.(),ke=null,Be(),I>=15&&Ve(`Superkraften är laddad igen!`)},Ze=(e=1)=>{O=Vn*e*(s(`maan`)?nr:1),k=!1,F=!1,de=0,M=0,j=0,xe=er,o.jump()},Qe=()=>{D=0,O=0,k=!0,F=!1,Ce=+!!s(`dubbel`),xe=er},$e=e=>{if(a.float&&L>0){let t=lr+Math.sin(Oe*3)*18;D+=(t-D)*Math.min(1,e*4),O=0,k=!1;return}de=k?Gn:de-e,M>0&&(M-=e,(de>0||F)&&Ze()),s(`studs`)&&k&&he&&(O=ir,k=!1,F=!0);let t=!1,n=!1;if(!k){let r=A&&O>0&&j<Un&&!F;r&&(j+=e);let i=Bn*(r?Hn:1)*(s(`maan`)?tr:1);s(`raket`)&&A&&!F&&!r&&xe>0&&O<320&&(t=!0,xe-=e,i=0,O=Math.min(O+2600*e,320),Se<=0&&(o.rocket(),Se=.8)),O-=i*e,s(`moln`)&&A&&O<-200&&(O=-200,n=!0),D+=O*e,D>Kn&&(D=Kn,O=Math.min(O,0)),D<=0&&Qe()}Se-=e,v.classList.toggle(`rocketing`,t),v.classList.toggle(`gliding`,n)},et=e=>{d=u(),w=Math.min(T,w+Xn*e);let t=w*e*(De>0?sr:1);E+=t;let n=Math.max(0,Math.floor(E/Zn/pr));n!==je&&Ne(n,!0),L>0&&(L-=e,Oe+=e,oe.style.setProperty(`--p`,String(Math.max(0,L/6*100))),L<=0&&Xe()),s(`banan`)&&De<=0&&k&&L<=0&&(Ee-=e,Ee<=0&&(De=or,Ee=6+Math.random()*5,o.whoosh(),He(`Hoppsan!`))),De>0&&(De-=e),v.classList.toggle(`sliding`,De>0),s(`sol`)&&!we&&(Te-=e,Te<=0&&(we=!0,v.classList.add(`sunny`))),$e(e),x.classList.toggle(`walking`,k||F),x.classList.toggle(`jumping`,!k&&!F),pe-=t,pe<=0&&(pe=Fe()),fe>0&&(fe-=e);let r=Le(),i=Q.x+Q.w/2,c=(r.top+r.bottom)/2;for(let n of be){if(n.gone)continue;if(n.t+=e,n.x-=t+n.vx*e,(n.kind===`hopper`||n.kind===`frog`)&&(n.lift=n.amp*Math.abs(Math.sin(Math.PI*n.t/n.period))),n.kind===`thrower`&&n.balls>0&&n.x<1420&&(n.el.classList.add(`throwing`),n.wait-=e,n.wait<=0&&n.x>760&&(--n.balls,n.wait=.9,R(`ball`,n.x+70,46,{vx:320}),o.whoosh()),(n.balls===0||n.x<=760)&&(n.balls=0,window.setTimeout(()=>n.el.classList.replace(`throwing`,`hiding`),350))),s(`magnet`)&&vr(n.kind)){let{w:t,h:r}=mr[n.kind],a=n.x+t/2,o=Re(n)+r/2;if(n.pulled||Math.hypot(a-i,o-c)<cr){n.pulled=!0;let t=Math.min(1,e*7);n.x+=(i-a)*t,n.kind!==`frog`&&(n.lift+=(o-c)*t)}}if(L>0&&a.treat!==`ignore`&&!n.harmless&&(_r(n.kind)||n.kind===`ball`)&&n.x<1600+f()&&Ge(n,a.treat),n.gone)continue;if(n.x<-260-f()||n.x>2300){n.gone=!0,n.el.remove();continue}let l=z(n);if(yr(r,l)){if(n.kind===`puddle`)D<30&&O<=0&&!(a.float&&L>0)&&(Ze(rr/Vn),o.splash(),b(_,{x:i,y:Rn,count:12,size:22,html:()=>Ct,angle:[200,340],distance:[80,260],duration:[500,800]}),He(`Plask!`));else if(vr(n.kind)?We(n):!n.harmless&&(L<=0||a.treat!==`ignore`)&&qe(n,r,l),ge)return}}for(let e=be.length-1;e>=0;e--)be[e].gone&&!be[e].el.isConnected&&be.splice(e,1)},tt=()=>{for(let e of be)e.gone||(e.el.style.transform=`translate(${e.x.toFixed(1)}px, ${Re(e).toFixed(1)}px)`);let e=k||F||a.float&&L>0?0:Math.max(-12,Math.min(12,-O/70));v.style.transform=`translate(${Q.x}px, ${Ie().toFixed(1)}px) rotate(${e.toFixed(1)}deg)`;for(let e of Ae)e.far.style.transform=`translateX(${-(E*.25%1600)}px)`,e.groundLayer.style.transform=`translateX(${-(E%1600)}px)`;let t=Math.floor(E/Zn);t!==me&&(me=t,re.textContent=String(t))},nt=e=>{let t=Math.max(0,Math.min(1/30,(e-ve)/1e3));ve=e,et(t),ge||(tt(),_e=window.requestAnimationFrame(nt))},rt=()=>{he=!0,o.unlock(),o.music(`catwalk`),p.querySelector(`.run-start`)?.remove(),ve=performance.now(),_e=window.requestAnimationFrame(nt)},V=()=>{ge||(he?(A=!0,!k&&de<=0&&!F&&Ce>0&&D>40&&!(a.float&&L>0)?(--Ce,Ze(.9),b(_,{x:Q.x+Q.w/2,y:Ie()+Q.h*.92,count:8,size:34,html:()=>`<div class="puff"></div>`,distance:[30,110],duration:[350,600]})):M=Wn):rt())},H=()=>{A=!1},at=null,ct=e=>{(e.code===`Space`||e.key===` `)&&(e.preventDefault(),e.repeat||(at?at():V()))},lt=e=>{(e.code===`Space`||e.key===` `)&&(e.preventDefault(),H())};window.addEventListener(`keydown`,ct),window.addEventListener(`keyup`,lt),window.addEventListener(`blur`,H),p.addEventListener(`pointerdown`,e=>{e.target.closest(`button`)||V()}),p.addEventListener(`pointerup`,H),p.addEventListener(`pointercancel`,H),p.querySelector(`[data-run="go"]`).addEventListener(`click`,e=>{e.currentTarget.blur(),rt()}),S(()=>Ye());let ut=()=>{window.cancelAnimationFrame(_e),window.removeEventListener(`keydown`,ct),window.removeEventListener(`keyup`,lt),window.removeEventListener(`blur`,H),ke?.(),ke=null,ye?.(),S(null)},dt=(e,t)=>`
    <ol class="run-top">
      ${e.map((e,n)=>{let r=l.find(t=>t.id===e.catId);return`<li class="${n===t?`me`:``}">
          <span class="rt-place">${n+1}</span>
          ${r?q(r,{},`rt-cat`):``}
          <span class="rt-name">${e.name}</span>
          <b class="rt-meters">${e.meters} m</b>
          <span class="rt-gifts">${dn(`#e5322d`,`#ffd23f`)}${e.gifts}</span>
        </li>`}).join(``)}
    </ol>`;async function ft(){ge=!0,window.cancelAnimationFrame(_e),A=!1,S(null),ke?.(),ke=null,v.classList.remove(`rocketing`,`gliding`,`sliding`,`sunny`),ae.remove(),o.music(null),o.sadTrombone(),x.classList.remove(`walking`,`jumping`),x.innerHTML=B(t.cat,t.outfit,{mood:`sad`}),v.classList.add(`fallen`),await g(1600);let i={meters:Math.floor(E/Zn),gifts:P},{list:a,place:s}=Ln({name:t.cat.name,catId:t.cat.id,meters:i.meters,gifts:P,at:Date.now()}),c=s===0;p.insertAdjacentHTML(`beforeend`,`
      <div class="run-panel run-over ${c?`record`:``}">
        <h2>${c?`Nytt rekord!`:`Slut på hjärtan!`}</h2>
        <p class="run-result">${t.cat.name} sprang <b>${i.meters} meter</b> och hittade <b>${P} julklappar</b>.</p>
        <h3>Topplistan</h3>
        ${dt(a,s)}
        <div class="run-actions">
          <button class="action" type="button" data-dir="left">${K(`left`)} Spara julkort</button>
          <button class="action run-again" type="button"><kbd class="key wide">Mellanslag</kbd> Spring igen</button>
          <button class="action" type="button" data-dir="right">Ny catwalk ${K(`right`)}</button>
        </div>
      </div>`),c?(o.fanfare(),ye=y(ue)):o.meow(t.cat.voice,!0),await g(700);let l=()=>{ut(),Cr(e,t,n,r)};at=l,p.querySelector(`.run-again`).addEventListener(`click`,l);let u=!1;S(async e=>{if(e===`right`)ut(),o.music(null),r();else if(!u){u=!0;try{await on(t,n,i),o.pick(`bell`),le.textContent=`Julkortet är sparat bland dina nedladdningar!`}catch{le.textContent=`Julkortet gick inte att spara. Prova igen!`}le.classList.remove(`show`),le.offsetWidth,le.classList.add(`show`),u=!1}})}Be(),tt()}var wr=14;function Tr(e){return e.replace(/[^\p{L}\p{N} -]/gu,``).replace(/ {2,}/g,` `).slice(0,wr)}function Er(e,t,n,r){S(null),e.innerHTML=`
    <section class="name-screen ${G(t)}">
      <div class="name-cat">
        ${q(n)}
        <p class="name-tag">${n.name}</p>
      </div>
      <form class="name-form" autocomplete="off">
        <span class="player-chip">${kt(t)}</span>
        <h2>Vad ska katten heta?</h2>
        <input class="name-input" type="text" maxlength="${wr}" placeholder="${n.name}" spellcheck="false" aria-label="Kattens namn" />
        <p class="name-help">Skriv ett namn och tryck <kbd class="key wide">Enter</kbd><br/>Om du inte skriver något heter den ${n.name.toLowerCase()}.</p>
        <button class="start-hint" type="submit">Klar!</button>
      </form>
    </section>`;let i=e.querySelector(`.name-form`),a=e.querySelector(`.name-input`),s=e.querySelector(`.name-tag`),c=!1;a.addEventListener(`input`,()=>{let e=Tr(a.value);e!==a.value&&(a.value=e);let t=e.trim();s.textContent=t?t.charAt(0).toUpperCase()+t.slice(1):n.name,s.classList.toggle(`custom`,t!==``)}),i.addEventListener(`submit`,t=>{if(t.preventDefault(),c)return;c=!0,o.unlock();let i=Tr(a.value).trim(),s=i?{...n,name:i.charAt(0).toUpperCase()+i.slice(1),nicknamed:!0}:n;a.blur(),o.pick(`bell`),o.meow(n.voice),e.querySelector(`.name-screen`)?.classList.add(`named`),window.setTimeout(()=>r(s),700)}),a.focus()}var Dr={jul:{title:`Julkatterna`,text:`Med regnbåge, silver och guld`},farg:{title:`Färgkatterna`,text:`En katt för varje färg i regnbågen`},vanlig:{title:`Vanliga katter`,text:`Helt vanliga huskatter`},rymd:{title:`Rymdkatterna`,text:`Från månen och stjärnorna`},hav:{title:`Havskatterna`,text:`Pirater, sjömän och sjöjungfrur`},saga:{title:`Sagokatterna`,text:`Prinsessor, trollkarlar och enhörningar`},djungel:{title:`Djungelkatterna`,text:`Lejon, leopard och panda`}},Or=[`jul`,`farg`,`vanlig`,`rymd`,`hav`,`saga`,`djungel`];function kr(e,t,n){let r=Or[0],i=Or[1],a=2,s=`both`,c=(e,t)=>`
    <button class="choice-card group-card ${t} ${s===t||s===`both`?`enter`:``}" type="button" data-dir="${t}" data-card="${t}">
      <div class="group-cats ${u(e).length>6?`many`:``}">
        ${u(e).map((e,t)=>q(e,{},`group-cat gc${t}`)).join(``)}
      </div>
      <h3>${Dr[e].title}</h3>
      <p class="power">${Dr[e].text}</p>
      ${K(t)}
    </button>`,l=()=>{e.innerHTML=`
      <section class="pick-screen ${G(t)}">
        <header class="pick-head">
          <span class="player-chip">${kt(t)}</span>
          <h2>Välj ditt kattgäng</h2>
          <p class="round-note">Runda ${a-1} av ${Or.length-1}: gänget du väljer går vidare, det andra åker ut.</p>
        </header>
        <div class="duel">
          ${c(r,`left`)}
          <div class="vs">eller</div>
          ${c(i,`right`)}
        </div>
      </section>`},d=c=>{S(null),o.pick(`bell`);let f=c===`left`?r:i;e.querySelector(`[data-card="${c}"]`)?.classList.add(`kept`),e.querySelector(`[data-card="${c===`left`?`right`:`left`}"]`)?.classList.add(`dropped`),window.setTimeout(()=>{if(a>=Or.length){Ar(e,t,u(f),n);return}let o=Or[a];a+=1,c===`left`?i=o:r=o,s=c===`left`?`right`:`left`,l(),S(d)},560)};l(),S(d)}function Ar(e,t,n,r){let i=n[0],a=n[1],s=2,c=`both`,l=new Set,u=(e,t)=>`
    <button class="choice-card ${t} ${c===t||c===`both`?`enter`:``}" type="button" data-dir="${t}" data-card="${t}">
      ${q(e)}
      <h3>${e.name}</h3>
      <p class="power"><strong>Superkraft:</strong> ${e.power}</p>
      ${K(t)}
    </button>`,d=()=>{let r=s-1,o=n.length-1;e.innerHTML=`
      <section class="pick-screen ${G(t)}">
        <header class="pick-head">
          <span class="player-chip">${kt(t)}</span>
          <h2>Välj din katt</h2>
          <p class="round-note">Runda ${r} av ${o}: katten du väljer går vidare, den andra åker ut.</p>
        </header>
        <div class="duel">
          ${u(i,`left`)}
          <div class="vs">eller</div>
          ${u(a,`right`)}
        </div>
        <div class="queue">
          ${n.map(e=>`<div class="queue-cat ${l.has(e.id)?`out`:e===i||e===a?`now`:`wait`}">${q(e)}</div>`).join(``)}
        </div>
      </section>`};d();let f=t=>{S(null);let u=t===`left`?i:a,p=t===`left`?a:i;l.add(p.id),o.pick(`bell`),o.meow(u.voice),e.querySelector(`[data-card="${t}"]`)?.classList.add(`kept`),e.querySelector(`[data-card="${t===`left`?`right`:`left`}"]`)?.classList.add(`dropped`),window.setTimeout(()=>{if(s>=n.length){r(u);return}let e=n[s];s+=1,t===`left`?a=e:i=e,c=t===`left`?`right`:`left`,d(),S(f)},560)};S(f)}function jr(e,t,n,r){let i={},a=0,l=(e,t)=>`
    <button class="choice-card style-card ${t} enter" type="button" data-dir="${t}" data-card="${t}">
      ${e.naughty?`<span class="bus-tag">Bus!</span>`:``}
      ${q(n,{...i,[e.slot]:e.id})}
      <h3>${e.name}</h3>
      ${K(t)}
    </button>`,u=()=>{let d=s[a],[p,ee]=m(d);e.innerHTML=`
      <section class="pick-screen style-screen ${G(t)}">
        <header class="pick-head">
          <span class="player-chip">${kt(t)} · ${n.name}</span>
          <h2>Left or Right: ${c[d]}</h2>
        </header>
        <div class="duel">
          ${l(p,`left`)}
          <div class="vs">eller</div>
          ${l(ee,`right`)}
        </div>
        <ol class="steps">
          ${s.map((e,t)=>`
            <li class="${t===a?`current`:t<a?`done`:``}">
              <span class="step-label">${c[e]}</span>
              <span class="step-value">${i[e]?f[i[e]].name:t===a?`Väljer nu…`:`?`}</span>
            </li>`).join(``)}
        </ol>
      </section>`,S(t=>{S(null);let n=t===`left`?p:ee;i[d]=n.id,o.pick(n.sound),e.querySelector(`[data-card="${t}"]`)?.classList.add(`kept`),e.querySelector(`[data-card="${t===`left`?`right`:`left`}"]`)?.classList.add(`dropped`),window.setTimeout(()=>{a+=1,a<s.length?u():r(i)},700)})};u()}function Mr(e,t,n,r,i){o.meow(t.cat.voice),e.innerHTML=`
    <section class="turn-screen">
      <div class="turn-side ${G(t.index)}">
        ${q(t.cat,t.outfit)}
        <p>${kt(t.index)} är klar!</p>
      </div>
      <div class="turn-next ${G(n)}">
        <h2>${kt(n)}, din tur!</h2>
        <p>Nu ska ${At(r)} få sina kläder.</p>
        <button class="start-hint" type="button" data-dir="right">Tryck ${K(`left`)} eller ${K(`right`)}</button>
      </div>
    </section>`,S(()=>{S(null),i()})}var Nr=[{label:`Snygghet`,short:`Snygg`,value:e=>e.style},{label:`Buspoäng`,short:`Bus`,value:e=>e.bus},{label:`Kombos`,short:`Kombos`,value:e=>e.comboPoints,note:e=>e.combos.map(e=>`${e.name} +${e.points}`).join(`, `)},{label:`Superkraft`,short:`Kraft`,value:e=>e.powerPoints,note:e=>e.powerNote??``},{label:`Publikens jubel`,short:`Jubel`,value:e=>e.cheer}];function Pr(e,t){return`
    <div class="tally-col ${G(e.index)}" data-col="${t}">
      <div class="tally-head">
        ${q(e.cat,e.outfit)}
        <div><span class="player-chip">${W(e)}</span><h3>${e.cat.name}</h3></div>
      </div>
      <ul>
        ${Nr.map((e,t)=>`<li data-row="${t}"><span class="row-label">${e.label}<small></small></span><b>0</b></li>`).join(``)}
      </ul>
      <div class="tally-total"><span>Totalt</span><b>0</b></div>
    </div>`}function Fr(e){return`
    <div class="tally-table rows-${e.length}">
      <div class="tt-row tt-head">
        <span class="tt-who"></span>
        ${Nr.map(e=>`<span class="tt-cell">${e.short}</span>`).join(``)}
        <span class="tt-total">Totalt</span>
      </div>
      ${e.map((e,t)=>`
        <div class="tt-row ${G(e.index)}" data-col="${t}">
          <span class="tt-who">${q(e.cat,e.outfit)}<span class="player-chip">${W(e)}</span><b class="tt-name">${e.cat.name}</b></span>
          ${Nr.map((e,t)=>`<span class="tt-cell" data-row="${t}"><b>·</b></span>`).join(``)}
          <span class="tt-total"><b>0</b></span>
        </div>`).join(``)}
    </div>`}async function Ir(e,t,n,r){o.music(`menu`);let i=t.length===2;e.innerHTML=`
    <section class="tally ${i?``:`many`}">
      <h2>Domarnas poäng</h2>
      ${i?`<div class="tally-grid">${Pr(t[0],0)}<div class="vs">mot</div>${Pr(t[1],1)}</div>`:Fr(t)}
      <p class="tally-footer"></p>
    </section>`;let a=t.map(()=>0);for(let r=0;r<Nr.length;r++)await g(i?520:420),t.forEach((t,o)=>{let s=e.querySelector(`[data-col="${o}"] [data-row="${r}"]`),c=Nr[r].value(n.scores[o]);s.classList.add(`show`),s.querySelector(`b`).textContent=String(c);let l=s.querySelector(`small`);l?l.textContent=Nr[r].note?.(n.scores[o])??``:s.title=Nr[r].note?.(n.scores[o])??``,a[o]+=c,e.querySelector(`[data-col="${o}"] ${i?`.tally-total`:`.tt-total`} b`).textContent=String(a[o])}),o.tick();await g(600),e.querySelector(`[data-col="${n.winner}"]`).classList.add(`lead`),i||n.ranking.forEach((t,n)=>{e.querySelector(`[data-col="${t}"]`).insertAdjacentHTML(`afterbegin`,`<span class="tt-place">${n+1}</span>`)}),o.tada();let s=e.querySelector(`.tally-footer`);s.innerHTML=`${n.tiebreak?`<strong>${n.tiebreak}</strong> `:``}<button class="start-hint" type="button" data-dir="right">Till finalen: tryck ${K(`left`)} eller ${K(`right`)}</button>`,S(()=>{S(null),r()})}var Lr={rosa:{head:`renoron`,tail:`julstjarna`},gra:{head:`soptunna`,top:`mobildrakt`,shoes:`tomteskor`},julgran:{head:`julljus-hatt`,top:`ljusdrakt`,shoes:`ljusskor`,tail:`julljus-svans`},nisse:{head:`tomteluva`,top:`pepparkaksdrakt`,shoes:`pepparkaksskor`,tail:`pepparkakssmulor`},regnbage:{head:`regnbagshatt`,top:`regnbagstroja`,shoes:`regnbagsskor`,tail:`regnbagssvans`},silver:{head:`guldkrona`,top:`silverkavaj`,shoes:`molnskor`,tail:`glitterboa`},guld:{head:`guldkrona`,top:`silverkavaj`,shoes:`raketskor`},rod:{head:`fargmossa`,top:`fargtroja`,shoes:`fargskor`,tail:`fargrosett`},orange:{head:`fargmossa`,tail:`fargrosett`},gul:{top:`fargtroja`,shoes:`fargskor`,tail:`fargrosett`},gron:{head:`bajshatt`,top:`julgransdrakt`,tail:`julkulor`},bla:{head:`fargmossa`,top:`fargtroja`,shoes:`fargskor`},lila:{head:`fargmossa`,top:`fargtroja`,shoes:`fargskor`,tail:`fargrosett`},svart:{head:`solglasogon`,top:`hoodie`,shoes:`gympaskor`},vit:{top:`randig`,tail:`ballong`},tiger:{head:`keps`,top:`hoodie`,shoes:`gummistovlar`},trefarg:{head:`luciakrona`,top:`julklappsdrakt`,tail:`harsnodd`},siames:{head:`solglasogon`,top:`randig`,shoes:`gympaskor`,tail:`harsnodd`},smoking:{head:`kastrull`,top:`kalsonger`,shoes:`bananskal`,tail:`toapapper`},astronaut:{head:`rymdhjalm`,top:`rymddrakt`,shoes:`maanskor`,tail:`planetring`},mane:{top:`rymddrakt`,tail:`planetring`},stjarn:{head:`trollkarlshatt`,tail:`trollstav`},pirat:{head:`pirathatt`,top:`piratrock`,tail:`papegoja`},sjojungfru:{head:`blackfisk`,shoes:`snackskor`},sjoman:{top:`randig`,shoes:`gummistovlar`,tail:`papegoja`},prinsessa:{head:`guldkrona`,top:`prinsessklanning`,shoes:`glasskor`,tail:`trollstav`},trollkarl:{head:`trollkarlshatt`,tail:`trollstav`},enhorning:{top:`prinsessklanning`,shoes:`molnskor`},lejon:{head:`orm`,top:`lovdrakt`},leopard:{head:`safarihatt`,shoes:`kokosskor`,tail:`apa`},panda:{head:`svettband`,top:`fotbollstroja`,shoes:`fotbollsskor`,tail:`pompom`}};function Rr(e,t){e.innerHTML=`
    <section class="title-screen">
      <h1 class="game-title"><span>Julkattens</span><span class="title-big">Catwalk</span></h1>
      <p class="tagline">1 till 10 spelare. Trettioen katter. Ett mycket tveksamt modeval i taget.</p>
      <div class="lineup">
        ${l.map((e,t)=>q(e,Lr[e.id],`lineup-cat`).replace(`class="cat-box`,`style="animation-delay:-${t*.37%2.6}s" class="cat-box`)).join(``)}
      </div>
      <button class="start-hint" type="button" data-dir="right">
        Tryck ${K(`left`)} eller ${K(`right`)} för att börja
      </button>
    </section>`,S(()=>{S(null),t()})}var zr=document.getElementById(`stage`),$=document.getElementById(`screen`),Br=document.getElementById(`mute`),Vr=2140;function Hr(){let e=document.documentElement.clientWidth,t=document.documentElement.clientHeight,n=Math.round(Math.min(Vr,Math.max(1600,900*e/t)));zr.style.width=`${n}px`,zr.style.setProperty(`--side`,`${(n-1600)/2}px`);let r=Math.min(e/n,t/900);zr.style.transform=`translate(-50%, -50%) scale(${r})`}window.addEventListener(`resize`,Hr),Hr();function Ur(){let e=o.toggleMute();Br.classList.toggle(`muted`,e),Br.setAttribute(`aria-label`,e?`Slå på ljudet`:`Stäng av ljudet`)}Br.addEventListener(`click`,e=>{Ur(),e.currentTarget.blur()}),window.addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||(e.key===`m`||e.key===`M`)&&Ur()}),ne(zr),window.matchMedia(`(pointer: coarse)`).matches&&window.addEventListener(`pointerdown`,()=>{document.fullscreenElement||window.matchMedia(`(display-mode: fullscreen)`).matches||document.documentElement.requestFullscreen?.({navigationUI:`hide`}).then(()=>window.screen.orientation.lock?.(`landscape`)).catch(()=>void 0)},{once:!0});var Wr=document.getElementById(`install`),Gr=null;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),Gr=e,Wr.hidden=!1}),Wr.addEventListener(`click`,async e=>{if(e.stopPropagation(),Wr.blur(),!Gr)return;let t=Gr;Gr=null,Wr.hidden=!0,await t.prompt();let{outcome:n}=await t.userChoice;n===`dismissed`&&(Gr=t,Wr.hidden=!1)}),window.addEventListener(`appinstalled`,()=>{Gr=null,Wr.hidden=!0});var Kr=navigator.wakeLock,qr=null,Jr=()=>{Kr&&!qr&&document.visibilityState===`visible`&&Kr.request(`screen`).then(e=>{qr=e,e.addEventListener(`release`,()=>{qr=null})}).catch(()=>void 0)};window.addEventListener(`pointerdown`,Jr),window.addEventListener(`keydown`,Jr),document.addEventListener(`visibilitychange`,Jr),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>void navigator.serviceWorker.register(`./sw.js`).catch(()=>void 0)),_(document.getElementById(`snow`));function Yr(){let e=l[Math.floor(Math.random()*l.length)],t={};for(let e of s){let[n,r]=m(e);t[e]=(Math.random()<.5?n:r).id}return{index:1,cat:e,outfit:t,cpu:!0}}var Xr=e=>new Promise(t=>kr($,e,n=>Er($,e,n,t))),Zr=(e,t)=>new Promise(n=>jr($,e,t,n)),Qr=2;async function $r(){await new Promise(e=>Rr($,e)),o.music(`menu`);let e=await new Promise(e=>$t($,Qr,e));Qr=e;let t=[];for(let n=0;n<e;n++)t.push(await Xr(n));let n=[];for(let r=0;r<e;r++)r>0&&await new Promise(e=>Mr($,n[r-1],r,t[r],e)),n.push({index:r,cat:t[r],outfit:await Zr(r,t[r])});e===1&&n.push(Yr());let r=ue(n);await new Promise(e=>void Qt($,n,e)),await new Promise(e=>void Ir($,n,r,e)),ln($,n,r,()=>void $r(),(e,t)=>Cr($,e,t,()=>void $r()))}$r();