/* Weebly puzzle: it appears to be generating requests in order to complete 
  a set of steps to move through.  Each step adds data to the parameters.
- First step was to just call the solvePuzzle function and uncomment the 
    alert in the handlerSolvePuzzle function (that way you can see the instructions)
- Second step was to add a unix timestamp as 'auth'
- Third step was to respond to 'SYN' which is the first step in the TCP handshake
    SYN-ACK would be the second step and we were to use that for msg
- Fourth Step instruction was to respond with the cleartext of a MD5 Hash
    Instructions noted that the hash changes on the hour
- Fifth Step this was probably the hardest part.  The response was the following:  
ZXZhbHVhdGUgdGhlIGZvbGxvd2luZzogIGFsZXJ0KCdUaGUgc2VjcmV0IGNvZGUgaXM6ICcrYStkKyhjKyJfIikrKGIqMikpOwo==
    (This isn't the solution...)    
    I couldn't quite figure out what to do with that. Was it AES hash, or some other cryptographic hash?
    I wasn't really thinking too well on this one, as I was thinking it was much more
    complex than it needed to be.  (That's a flaw that I have)
    I was thinking what could this 101 character string be?  Wait, string. String conversions. Base64! 
    decode yielded :'evaluate the following:  alert('The secret code is: '+a+d+(c+"_")+(b*2));'

    'The secret code is: the_answer_is_42'

    A reference to Douglas Adams Hitchhikers guide to the galaxy.
*/ 

function solvePuzzle() {
    var timestamp = Math.round((new Date().getTime())/1000);
    var req = new Ajax.Request('/weebly/publicBackend.php', {
        parameters:{
            pos: 'solvepuzzle',
            auth: timestamp,
            msg: 'SYN-ACK', //instructions were to reply to SYN 
            next: 'w3108' //cleartext for b374ba61f6961dbc7af462ff96bc38fd
        },
        onSuccess:handlerSolvePuzzle,
        onFailure:function() { alert('Transmission error. Please try again.'); }
    });

}

function handlerSolvePuzzle(t) {

            var responseText = t.responseText;
            responseText = responseText.replace(/\n/, "");

            if (responseText.match(/!!$/)) {

                alert("Oops: "+responseText);

            } else {

                // Still need to decode the response

                // Once the response is decoded, we can fire off the alert
                // giving the user further instructions

                alert('To complete the challenge, '+t.responseText);

            }

}
