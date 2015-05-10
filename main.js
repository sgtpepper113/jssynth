var context;
var active = {};
function envLock(param){
  var val = document.getElementById('env_1_'+param).value;
  document.getElementById('env_2_'+param).value = val;
  document.getElementById('env_3_'+param).value = val;
  document.getElementById('env_2_'+param).value = val;
  document.getElementById('env_3_'+param).value = val;
  document.getElementById('env_2_'+param).disabled = !document.getElementById('env_2_'+param).disabled;
  document.getElementById('env_3_'+param).disabled = !document.getElementById('env_3_'+param).disabled;
}
function envLockToggle(param){
  document.getElementById('env_2_'+param).disabled = !document.getElementById('env_2_'+param).disabled;
  document.getElementById('env_3_'+param).disabled = !document.getElementById('env_3_'+param).disabled;
}
function filterLock(param){
  var val = document.getElementById('filter_1_'+param).value;        
  document.getElementById('filter_2_'+param).value = val;
  document.getElementById('filter_3_'+param).value = val;
  document.getElementById('filter_2_'+param).value = val;
  document.getElementById('filter_3_'+param).value = val;
  document.getElementById('filter_2_'+param).disabled = !document.getElementById('filter_2_'+param).disabled;
  document.getElementById('filter_3_'+param).disabled = !document.getElementById('filter_3_'+param).disabled;
}
window.addEventListener('load', audioInit, false);
function audioInit() {
  try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext; //Set up the audio api
    context = new AudioContext();
    initKeys();
    document.getElementById('envLock').addEventListener('change',function(){
      if (document.getElementById('envLock').checked === true){
        console.log('sssssssssss');
        document.getElementById('env_1_attack').onChange = function(e){
          console.log('sssss2222');
            var val = +document.getElementById('env_1_'+e.currentTarget.id.slice(6)).value;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
        };
        document.getElementById('env_1_decay').onChange = function(e){
            var val = +document.getElementById('env_1_'+e.currentTarget.id.slice(6)).value;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
        };
        document.getElementById('env_1_sustain').onChange = function(e){
            var val = +document.getElementById('env_1_'+e.currentTarget.id.slice(6)).value;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
        };
        document.getElementById('env_1_release').onChange = function(e){
            var val = +document.getElementById('env_1_'+e.currentTarget.id.slice(6)).value;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
            document.getElementById('env_2_'+param).value = val;
            document.getElementById('env_3_'+param).value = val;
        };
        envLockToggle('attack');
        envLockToggle('decay');
        envLockToggle('sustain');
        envLockToggle('release');
                                                                  
      } else {
        document.getElementById('env_1_attack').onChange = null;
        document.getElementById('env_1_decay').onChange = null;
        document.getElementById('env_1_sustain').onChange = null;
        document.getElementById('env_1_release').onChange = null;
        envLockToggle('attack');
        envLockToggle('decay');
        envLockToggle('sustain');
        envLockToggle('release');
      }
    });
    document.getElementById('filterLock').addEventListener('change',function(){
      if (document.getElementById('filterLock').checked === true){
        document.getElementById('filter_1_cutoff').addEventListener('input',
                                                                  filterLock('cutoff'));
        document.getElementById('filter_1_res').addEventListener('input',
                                                                filterLock('res'));
        document.getElementById('filter_1_filtertype').addEventListener('change',
                                                                  filterLock('filtertype'));
  
      } else {
       document.getElementById('filter_1_cutoff').removeEventListener('input',
                                                                  filterLock('cutoff'));
        document.getElementById('filter_1_res').removeEventListener('input',
                                                                filterLock('res'));
        document.getElementById('filter_1_filtertype').removeEventListener('change',
                                                                  filterLock('filtertype'));
      }});
  }
  catch(e){
    alert('Audio API unsupported');
  }
}

function oscCreate(oscType, oscFreq, oscVol) {
  var osc;
  var oscGain;
  osc = context.createOscillator();
  oscGain = context.createGain();
  osc.connect(oscGain);
  osc.gainNode = oscGain;
  osc.gainNode.gain.value = oscVol || 0.5;
  osc.type = oscType || 'sawtooth';
  osc.frequency.value = oscFreq || 440;
  return osc;
}
function adsrCreate(attack, decay, sustain, release) {
  var adsr = {'attack':attack || 10,
              'decay':decay || 10,
              'sustain':sustain || 0.3,
              'release':release || 1000};
  var amp;
  amp = context.createGain();
  amp.adsr = adsr;
  amp.trigger = function (){
    var master = +document.getElementById('master').value;
    amp.gain.exponentialRampToValueAtTime(0.0001,context.currentTime);
    amp.gain.exponentialRampToValueAtTime(1*master,context.currentTime + (adsr['attack']/1000));
    amp.gain.exponentialRampToValueAtTime(adsr['sustain']*master,context.currentTime + (adsr['decay']/1000));
  };
  amp.release = function (){
    var master = +document.getElementById('master').value;
    amp.gain.exponentialRampToValueAtTime(0.0001,context.currentTime + (adsr['release']/1000));
  };
  return amp;
}
function filterCreate(filterType, cutoff, resonance){
  var filter = context.createBiquadFilter();
  filter.type = filterType || 'lowpass';
  filter.frequency.value = cutoff || 7000;
  filter.Q.value = resonance || 1;
  filter.connect(context.destination);
  return filter;
}

var keysDown = {};
window.addEventListener("keydown", function(e){
  if (keysDown[e.keyCode] === true){
    return;
  }
  var keycontainer = document.getElementById('keys').children;
  for(var i=0;i<keycontainer.length;i++){
    if (keycontainer[i].getAttribute('data-keycode') === e.keyCode.toString()){
        keysDown[e.keyCode] = true;
        var mouseDown = new Event('mousedown');
        keycontainer[i].dispatchEvent(mouseDown);
        activeToggle(keycontainer[i]);
        return;
    }
  }
});
window.addEventListener("keyup", function(e){
  var keycontainer = document.getElementById('keys').children;
  for(var i=0;i<keycontainer.length;i++){
    if (keycontainer[i].getAttribute('data-keycode') === e.keyCode.toString()){
        keysDown[e.keyCode] = false;
        var mouseUp = new Event('mouseup');
        keycontainer[i].dispatchEvent(mouseUp);
        activeToggle(keycontainer[i]);
        return;
    }
  }
});

function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function activeToggle(key){
  if (hasClass(key, 'pressed')) {
    var regex = new RegExp('(\\s|^)pressed(\\s|$)');
    key.className=key.className.replace(regex, ' ');
  } else {
    key.className += ' pressed';
  }
}


function initKeys(octaves) {
  //calculate the frequency for each of the keys onscreen starting at A4/440Hz
  var key;
  var keychars = 'AWSEDFTGYHUJKOLP;';
  var keycontainer = document.getElementById('keys').children;
  var noteoffset = octaves * 12 || 0;
  for(var i=0;i<keycontainer.length;i++){
    keycontainer[i].setAttribute('data-frequency',
                                 Math.pow(Math.pow(2,1/12),i + noteoffset)*440);
    keycontainer[i].setAttribute('data-keycode',keychars.charCodeAt(i) || 0);
    keycontainer[i].addEventListener('mousedown',function(){
      var frequency = parseFloat(this.getAttribute('data-frequency'));
      var note = {};
      note.osc = [oscCreate(document.getElementById('osc_1_type').value, 
                            +document.getElementById('osc_1_detune').value+frequency, 
                            document.getElementById('osc_1').value),
                  oscCreate(document.getElementById('osc_2_type').value,
                            +document.getElementById('osc_2_detune').value+frequency,
                            document.getElementById('osc_2').value),
                  oscCreate(document.getElementById('osc_3_type').value,
                            +document.getElementById('osc_3_detune').value+frequency,
                            document.getElementById('osc_3').value)
                  ];
      note.osc.forEach(function(x,i){
        x.start();
        x.adsr = adsrCreate(+document.getElementById('env_'+(i+1)+'_attack').value,
                            +document.getElementById('env_'+(i+1)+'_decay').value,
                            +document.getElementById('env_'+(i+1)+'_sustain').value,
                            +document.getElementById('env_'+(i+1)+'_release').value
        );
        x.filter = filterCreate(+document.getElementById('filter_'+(i+1)+'_filtertype').value,
                            +document.getElementById('filter_'+(i+1)+'_cutoff').value,
                            +document.getElementById('filter_'+(i+1)+'_res').value
        );
        x.gainNode.connect(x.adsr);
        x.adsr.connect(x.filter);
        x.adsr.trigger();
    });
      this.addEventListener('mouseup',function(){
        note.osc.forEach(function(x){
        x.adsr.release();
        setTimeout(function(){
          x.stop();
          x.disconnect();
          x.gainNode.disconnect();
          x.adsr.disconnect();
          x.filter.disconnect();
          x = null;
        },x.adsr.adsr['release']+100);
        
        });
      });
  });
}}


