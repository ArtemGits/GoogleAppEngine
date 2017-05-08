var id;
   window.onload = function getID() {
    var pathArray = window.location.pathname.split( '/' );
     id = pathArray[3];
    console.log(id);
    
    //console.log(globId);
    var url = '/notes/' + id;
    console.log("URL "+url);
    var open = window.indexedDB.open(DB_NAME, 8);
    open.onsuccess = function(event) {
    
    
    var db = event.target.result;
    var tx = db.transaction("notes", "readwrite");
    var store = tx.objectStore("notes");
    
    //Get Note 
   var InnerHTML;
   var record =  store.get(id);
   record.onsuccess = function(event) {
    console.log("RECORD");
    console.log(record.result.content.toString());
    
                  document.getElementsByName("name")[0].value =record.result.name.toString();
                  document.getElementsByName("description")[0].value =record.result.description.toString();
                  InnerHTML = record.result.content.toString();
                  
   };
   
   

                 

        

    

     tx.oncomplete = function() {  
      db.close();
      document.getElementById("introduction").innerHTML = InnerHTML;
      // The inline editor should be enabled on an element with "contenteditable" attribute set to "true".
      // Otherwise CKEditor will start in read-only mode.
      var introduction = document.getElementById( 'introduction' );
      introduction.setAttribute( 'contenteditable', true );

      CKEDITOR.inline( 'introduction', {
        // Allow some non-standard markup that we used in the introduction.
        extraAllowedContent: 'a(documentation);abbr[title];code',
        removePlugins: 'stylescombo',
        extraPlugins: 'sourcedialog',
        // Show toolbar on startup (optional).
        startupFocus: true
      });
     }


}; 

                                     

                
   };


   

  (function ($) {
   
    $.fn.serializeFormJSON = function () {
       var  strarr;
        var o = {};
        var o2 = {};
        var a = this.serializeArray();
        $.each(a, function () {
              if(this.name == "tags") {
                  strarr = this.value.split(',');
                  o[this.name] = strarr;
              } else {
                 o[this.name] = this.value || '';
              }
               
            
            o2["data"] = o;
        });
        return o2;
    };
})(jQuery);

$(document).ready(function() {
 $("#updateNoteForm").submit(function(event) {
  event.preventDefault();
   var url = '/notes/' + id;
   console.log("URL2 " + url);
  var data = $(this).serializeFormJSON();
                var password = new buffer.SlowBuffer(localStorage.getItem("clientPass").normalize('NFKC'));
                var salt = new buffer.SlowBuffer("someSalt".normalize('NFKC'));
           
                var N = 1024, r = 8, p = 1;
                var dkLen = 32;
              
                scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                  if (error) {
                    console.log("Error: " + error);
           
                  } else if (key) {
                  var text = document.getElementById("introduction").innerHTML;
                   var textBytes = aesjs.utils.utf8.toBytes(text);
                  // The counter is optional, and if omitted will begin at 1
                  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                  var encryptedBytes = aesCtr.encrypt(textBytes);
                  // To print or store the binary data, you may convert it to hex
                  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

                   data["data"].content = encryptedHex.toString();
                   console.log(data["data"].content);
                   var json = JSON.stringify(data);

                   console.log(json);
                   $.ajax({
                        url: url,
                        type: 'PUT',
                        data: json, 
                        success: function(datas) {
                                  alert("OK");
                                  

                                 

                                   
                                  }
                        
                   });
           
                  } else {
                    // update UI with progress complete 
                   // updateInterface(progress);
                   console.log("PROGRESS");
                   

                  }
                });









  
  

 
 }); 
});