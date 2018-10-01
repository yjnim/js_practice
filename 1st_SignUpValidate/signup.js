function signupValidate(){

 var rule = /^[a-z]{1}[a-z0-9]+$/;

 if(document.signupform.userId.value==""){
 alert("아이디를 입력해주세요.");
 document.signupform.userId.focus();
 return false;
 }else if(document.signupform.passWord.value==""){
 alert("패스워드를 입력해주세요.");
 document.signupform.passWord.focus();
 return false;
 }else if(document.signupform.repassWord.value==""){
 alert("패스워드를 다시 한번 입력해주세요.");
 document.signupform.repassWord.focus();
 return false;
 }else if(document.signupform.passWord.value.length<6){
 alert("패스워드는 6자 이상으로 입력해주세요.");
 document.signupform.passWord.focus();
 return false;
 }else if(document.signupform.passWord.value!=document.signupform.repassWord.value){
 alert("패스워드가 다릅니다. 다시 입력해주세요.");
 document.signupform.passWord.focus();
 document.signupform.passWord.value=""
 document.signupform.repassWord.value=""
 return false;
 }else if (!rule.test(document.signupform.userId.value)){
 alert("아이디는 첫 글자가 영어 소문자여야 합니다. \n다시 입력해주세요.");
 document.signupform.userId.select();
 document.signupform.userId.focus();
 return false;
 }else {
 alert("회원가입이 완료되었습니다.");
 }


}
