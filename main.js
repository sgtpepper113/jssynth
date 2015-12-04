var context;
var mix;
var active = {};
function envLockToggle(param){
  document.getElementById('env_2_'+param).disabled = !document.getElementById('env_2_'+param).disabled;
  document.getElementById('env_3_'+param).disabled = !document.getElementById('env_3_'+param).disabled;
}
function filterLockToggle(param){
  document.getElementById('filter_2_'+param).disabled = !document.getElementById('filter_2_'+param).disabled;
  document.getElementById('filter_3_'+param).disabled = !document.getElementById('filter_3_'+param).disabled;
}
function setSelectIndex(elem, option){
  for (var i=0; i<elem.options.length; i++){
    if (elem.options[i].value === option){
      elem.selectedIndex = i;
      
    }
  }
}
function loadPreset(presetName){
  try{
    var preset = JSON.parse(localStorage.getItem('presets'));
    Object.keys(preset[presetName]).forEach(function(x){
      document.getElementById(x).value = preset[presetName][x];
    });
  } catch(e){
    alert('Preset could not be loaded.');
  }
}
function clearAllPresets(){
  try{
    if (confirm('Delete all saved presets?')){
    localStorage.removeItem('presets');}
  } catch(e){
    alert('Presets could not be delted.');
  }
}
function addPreset(){
  try{
  var presetsObject;
  var preset = {'master':document.getElementById('master').value,
                'envLock':document.getElementById('envLock').value,
                'filterLock':document.getElementById('filterLock').value,
                'osc_1':document.getElementById('osc_1').value,
                'osc_1_type':document.getElementById('osc_1_type').value,
                'osc_1_detune':document.getElementById('osc_1_detune').value,
                'env_1_attack':document.getElementById('env_1_attack').value,
                'env_1_decay':document.getElementById('env_1_decay').value,
                'env_1_sustain':document.getElementById('env_1_sustain').value,
                'env_1_release':document.getElementById('env_1_release').value,
                'filter_1_cutoff':document.getElementById('filter_1_cutoff').value,
                'filter_1_res':document.getElementById('filter_1_res').value,
                'filter_1_filtertype':document.getElementById('filter_1_filtertype').value,
                'osc_2':document.getElementById('osc_2').value,
                'osc_2_type':document.getElementById('osc_2_type').value,
                'osc_2_detune':document.getElementById('osc_2_detune').value,
                'env_2_attack':document.getElementById('env_2_attack').value,
                'env_2_decay':document.getElementById('env_2_decay').value,
                'env_2_sustain':document.getElementById('env_2_sustain').value,
                'env_2_release':document.getElementById('env_2_release').value,
                'filter_2_cutoff':document.getElementById('filter_2_cutoff').value,
                'filter_2_res':document.getElementById('filter_2_res').value,
                'filter_2_filtertype':document.getElementById('filter_2_filtertype').value,
                'osc_3':document.getElementById('osc_3').value,
                'osc_3_type':document.getElementById('osc_3_type').value,
                'osc_3_detune':document.getElementById('osc_3_detune').value,
                'env_3_attack':document.getElementById('env_3_attack').value,
                'env_3_decay':document.getElementById('env_3_decay').value,
                'env_3_sustain':document.getElementById('env_3_sustain').value,
                'env_3_release':document.getElementById('env_3_release').value,
                'filter_3_cutoff':document.getElementById('filter_3_cutoff').value,
                'filter_3_res':document.getElementById('filter_3_res').value,
                'filter_3_filtertype':document.getElementById('filter_3_filtertype').value};
  if(localStorage.getItem('presets')){
    presetsObject = JSON.parse(localStorage.getItem('presets'));
  } else {
    presetsObject = {};
  }
  var presetName = prompt('Please enter a name for this preset');
  presetsObject[presetName] = preset;

  localStorage.setItem('presets',JSON.stringify(presetsObject));
  alert('Preset saved');
  updatePresetList();
  } catch(e){
    alert('Preset could not be saved');
  }
}
function updatePresetList(){
  try{
  var presets = JSON.parse(localStorage.getItem('presets'));
  var list = document.getElementById('presets');
  var i = list.options.length - 1;
  for (i;i>=0;i--){
    list.remove(i);
  }
    Object.keys(presets).forEach(function(x){
      list.options[list.options.length] = new Option(x,x);
    });
  } catch(e){
    alert('Presets could not be loaded.');
  }
}
function initListeners(){
  document.getElementById('envLock').addEventListener('change',function(){
    envLockToggle('attack');
    envLockToggle('decay');
    envLockToggle('sustain');
    envLockToggle('release');
  });
    document.getElementById('filterLock').addEventListener('change',function(){
    filterLockToggle('cutoff');
    filterLockToggle('res');
    filterLockToggle('filtertype');
  });
  document.getElementById('env_1_attack').addEventListener('input',function(){
          if (document.getElementById('envLock').checked === true){
            var val = +document.getElementById('env_1_attack').value;
            document.getElementById('env_2_attack').value = val;
            document.getElementById('env_3_attack').value = val;
            document.getElementById('env_2_attack').value = val;
            document.getElementById('env_3_attack').value = val;} else {return;}});
            
    document.getElementById('env_1_decay').addEventListener('input',function(){
          if (document.getElementById('envLock').checked === true){
            var val = +document.getElementById('env_1_decay').value;
            document.getElementById('env_2_decay').value = val;
            document.getElementById('env_3_decay').value = val;
            document.getElementById('env_2_decay').value = val;
            document.getElementById('env_3_decay').value = val;} else {return;}});
          
    document.getElementById('env_1_sustain').addEventListener('input',function(){
          if (document.getElementById('envLock').checked === true){
            var val = +document.getElementById('env_1_sustain').value;
            document.getElementById('env_2_sustain').value = val;
            document.getElementById('env_3_sustain').value = val;
            document.getElementById('env_2_sustain').value = val;
            document.getElementById('env_3_sustain').value = val;} else {return;}});
            
    document.getElementById('env_1_release').addEventListener('input',function(){
          if (document.getElementById('envLock').checked === true){
            var val = +document.getElementById('env_1_release').value;
            document.getElementById('env_2_release').value = val;
            document.getElementById('env_3_release').value = val;
            document.getElementById('env_2_release').value = val;
            document.getElementById('env_3_release').value = val;} else {return;}});
            
    document.getElementById('filter_1_cutoff').addEventListener('input',function(){
          if (document.getElementById('filterLock').checked === true){
            var val = +document.getElementById('filter_1_cutoff').value;
            document.getElementById('filter_2_cutoff').value = val;
            document.getElementById('filter_3_cutoff').value = val;
            document.getElementById('filter_2_cutoff').value = val;
            document.getElementById('filter_3_cutoff').value = val;} else {return;}});
            
    document.getElementById('filter_1_res').addEventListener('input',function(){
          if (document.getElementById('filterLock').checked === true){
            var val = +document.getElementById('filter_1_res').value;
            document.getElementById('filter_2_res').value = val;
            document.getElementById('filter_3_res').value = val;
            document.getElementById('filter_2_res').value = val;
            document.getElementById('filter_3_res').value = val;} else {return;}});
            
    document.getElementById('filter_1_filtertype').addEventListener('change',function(){

          if (document.getElementById('filterLock').checked === true){
            var val = document.getElementById('filter_1_filtertype').value;
            setSelectIndex(document.getElementById('filter_2_filtertype'),val);
            setSelectIndex(document.getElementById('filter_3_filtertype'),val);
            setSelectIndex(document.getElementById('filter_2_filtertype'),val);
            setSelectIndex(document.getElementById('filter_3_filtertype'),val);} else {return;}});
}
window.addEventListener('load', audioInit, false);

function audioInit() {
  try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext; //Set up the audio api
    context = new AudioContext();
    mix = context.createChannelMerger(10);
    mix.ccount = 0;
    var compress = context.createDynamicsCompressor();
    mix.connect(compress);
    compress.connect(context.destination);
    initKeys();
    initListeners();
    updatePresetList();
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
  mix.ccount = (mix.ccount + 1) > 9 ? 9 : mix.ccount + 1; 
  filter.connect(mix, 0, mix.ccount);
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
                                 Math.pow(Math.pow(2,1/12),i + noteoffset) * 261.625565);
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
          mix.ccount--;
          x = null;
        },x.adsr.adsr['release']+100);
        });
      });
  });
}}


