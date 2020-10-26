window.addEventListener("DOMContentLoaded", handle);

let geat = (e, all = false) => all ? document.querySelectorAll(`${e}`) : document.querySelector(`${e}`);
var uploads = {};
var gerne = [];
var countries = [];
var atrists = [];
var audioUrl = '';
var imageUrl = '';
uploads['Activity'] = {};
var ArrayMaker = (e,elem)=>{
  var arr = [];
  var cxt = '' 
  
  //(\w.*-.*\w)
  e.replace(/((\w+.-.\w+)|R&B|\w+)/g, function(word, colon, full){
    cxt += `<span>${word}</span> `;
    arr.push(word.replace(/-/g, ' '));
  });
  elem.innerHTML = cxt;
  return arr;
};
function handle(e) {
  M.AutoInit();
  geat('#thumbnail').addEventListener('change', (e) => {
    geat('.preview').src = URL.createObjectURL(e.target.files[0]);
  
    
     var img = storage.ref(e.target.files[0].name).put(e.target.files[0]);
     
     img.on('state_changed',
      function progress(res){
        handleProgress(res);
      },
      
      function error(e){
        console.log('something happened');
      },
      function complete(res){
        console.log('upload complete');
        progress = geat(".progresscontainer progress");
        progress.style.display = 'none';
        storage.ref(e.target.files[0].name).getDownloadURL().then(res => {
          imageUrl = res;
        })
        
      }
     );
     
    //storage.ref(e.target.files[0].name).delete().then(()=>console.log('deleted'));
  });
  geat('#audio').addEventListener('change', (e) => {
    
    var img = storage.ref(e.target.files[0].name).put(e.target.files[0]);
    
    img.on('state_changed',
      function progress(res) {
        handleAudio(res);
      },
    
      function error(e) {
        console.log('something happened');
      },
      function complete(res) {
        console.log('upload complete');
        progress = geat(".audioprogress progress");
        progress.style.display = 'none';
        storage.ref(e.target.files[0].name).getDownloadURL().then(res=>{
          audioUrl = res;
        })
    
      }
    );
  });
  
  Array.from(geat('.chis',true)).forEach(chip=>{
    chip.addEventListener('keyup',e=>{
      text = e.currentTarget.textContent;
      ctx = e.currentTarget.getAttribute('data-type');
      arr = ArrayMaker(text, e);
      uploads[ctx] = arr;
    })
  })
  
  geat('#submit').addEventListener('click',e=>{
    uploads['Artist'] = geat('.artist').innerText;
    uploads['Title'] = geat('.song').innerText;
    uploads['Activity']['Comment_count']= parseInt(geat(".ccount").innerText);
    uploads['Activity']['Play_count']= parseInt(geat(".pcount").innerText);
    uploads['Activity']['Like_count']= parseInt(geat(".lcount").innerText);
    uploads['Collab'] = (geat('#collab').value == 'on')? true: false;
    uploads['Time'] = geat('#date').value;
    uploads['ImageUrl'] = imageUrl;
    uploads['AudioUrl'] = audioUrl;
    console.log(uploads);
    db.collection('Music').add(uploads).then(console.log('uploaded successfuly'))
    
  },false);
  
}

function handleProgress(res){
  progress = geat(".progresscontainer progress");
  progress.style.display = 'inline-block';
  state = (res.bytesTransferred / res.totalBytes) * parseInt(progress.getAttribute('max'));
  progress.value = state;
}
function handleAudio(res){
  progress = geat(".audioprogress progress");
  progress.style.display = 'inline-block';
  state = (res.bytesTransferred / res.totalBytes) * parseInt(progress.getAttribute('max'));
  progress.value = state;
}

