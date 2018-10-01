//document 요소 변수 지정
var subjectInput = document.getElementById('subjectInput');
var gradeInput = document.getElementById('gradeInput');
var creditInput = document.getElementById('creditInput');
var majorInput = document.getElementById('majorInput');


//과목명 규칙 - 숫자만 들어갈 경우 불통과
var subjectRule = /^[0-9]*$/;

//학점 규칙 - 숫자만 입력해야 함
var creditRule = /^[0-9]*$/;

//과목 추가
function addSubject() {

  if (subjectRule.test(subjectInput.value)) {
    //과목명 규칙 검사 - 과목명 규칙에 맞아들어갈 경우 알림을 띄워준 다음 입력한 과목명을 선택하고 false로 리턴
    alert('과목명은 숫자만으로 입력될 수 없습니다.');
    subjectInput.select();
    return false;

  } else if (gradeInput.value == -1) {
    //과목 등급을 선택하지 않았을 경우 알림을 띄워주고 select에 focus해준 다음 false로 리턴
    alert('등급을 선택해주세요.');
    gradeInput.focus();
    return false;

  } else if (creditInput.value == "") {
    //학점을 입력하지 않았을 경우 알림을 띄워주고 focus해준 다음 false로 리턴
    alert('학점을 입력해주세요.');
    creditInput.focus();
    return false;

  } else if (!creditRule.test(creditInput.value)) {
    //학점 입력란에 숫자가 아닌 문자가 입력되었을 경우 알림을 띄워주고 해당 value를 지운다음 focus해주고 false로 리턴
    alert('학점 입력은 1~2자리의 숫자만 가능합니다.');
    creditInput.value="";
    creditInput.focus();
    return false;

  } else {
    //위의 모든 과정을 통과할 경우 모든 결과를 저장하는 function으로 넘어간 후 입력 폼의 모든 값을 초기화
    saveResult();
    subjectInput.value = "";
    gradeInput.value = -1;
    creditInput.value = "";
    majorInput.checked = false;
  }

}

var parentTbody = document.getElementById('result');
//tr의 부모요소가 될 tbody를 지정해준 변수

//입력된 값들을 저장함 - 새로운 tr를 생성한 후 그 밑에 4개의 td를 생성해 줌
function saveResult() {
  var insertTr = document.createElement('tr');
  //tr을 생성하는 변수

  parentTbody.appendChild(insertTr);
  //tr을 tbody의 자식요소로 생성

  insertTr.id = "tr"+parentTbody.rows.length;
  //tr의 id를 행 번호로 지정해줌

  var insertTd1 = document.createElement('td');
  var insertTd2 = document.createElement('td');
  var insertTd3 = document.createElement('td');
  var insertTd4 = document.createElement('td');
  var insertTd5 = document.createElement('td');
  //td를 생성

  document.getElementById(insertTr.id).appendChild(insertTd1);
  insertTd1.id = "subject";
  document.getElementById(insertTr.id).appendChild(insertTd2);
  insertTd2.id = gradeInput.value;
  document.getElementById(insertTr.id).appendChild(insertTd3);
  insertTd3.id = "credit";
  document.getElementById(insertTr.id).appendChild(insertTd4);
  insertTd4.id = "major";
  document.getElementById(insertTr.id).appendChild(insertTd5);
  insertTd5.id = "del" + parentTbody.rows.length;
  insertTd5.style.border = "none";
  //td를 tr의 자식요소로 생성
  //각 td의 id 지정

  insertTd1.innerHTML = subjectInput.value;
  insertTd2.innerHTML = gradeInput.options[gradeInput.selectedIndex].text;
  insertTd3.innerHTML = creditInput.value;
  //각 td 안에 입력한 내용을 넣어줌

  if (majorInput.checked == true) {
    //전공인지 아닌지의 여부를 표시 - 체크가 되어있을 경우 O, 아닐 경우 X
    insertTd4.innerHTML = "O";
  } else {
    insertTd4.innerHTML = "X";
  }

  insertTd5.innerHTML = "<a href='#' style='color:red;' onclick='deleteResult(this)'>[x]</a>";

  allcalculator()
  majorCalculator()

}

//지정한 tr을 삭제하는 메소드
function deleteResult(obj) {

  var selectTr = obj.parentNode.parentNode;
  // 삭제 메소드가 작동하는 td의 해당 tr 지정
  selectTr.parentNode.removeChild(selectTr);
  //해당 tr을 삭제

  allcalculator()
  majorCalculator()
  //결과값을 다시 계산
}

//저장된 결과를 초기화하는 메소드
function deleteAll() {
  for (var x = 1; x <= parentTbody.rows.length+1; x++) {
    var trId = document.getElementById('tr'+x)
    trId.parentNode.removeChild(trId)
  }
  //저장된 행을 모두 삭제

  allcalculator()
  majorCalculator()
  //결과도 같이 초기화
}

//저장된 값을 불러와서 최종 총 학점 계산
function allcalculator() {
  var allgradecreditArray = new Array();
  //각 행의 등급*학점 결과값을 저장할 배열
  var allcreditArray = new Array();
  //각 행의 학점을 저장할 배열

  for (var i = 1; i <= parentTbody.rows.length; i++) {
    //각 행의 등급*학점 결과값을 구함
    var tbodySearch = document.getElementById('result');
    var trSearch = tbodySearch.childNodes[i];
    var gradeResult = trSearch.childNodes[1].id;
    var creditResult = trSearch.childNodes[2].innerText;
    //각 행 안의 tr 값들을 불러옴

    var allgradeCredit = Number(gradeResult)*Number(creditResult)
    //등급*학점 결과값

    allgradecreditArray[i] = allgradeCredit;
    //등급*학점 결과값을 배열로 전송
    allcreditArray[i] = Number(creditResult);
    //학점을 배열로 전송
  }

  function sum(array) {
    //각 배열 안의 값을 모두 더하는 메소드
    var totalresult = 0;

    for (var y = 1; y < array.length; y++){
      totalresult += array[y];
    }

    return totalresult;
  }

  var totalgc = sum(allgradecreditArray);
  var totalc = sum(allcreditArray);
  //각 배열의 값을 모두 더함

  var alltotal = Number(totalgc)/Number(totalc)
  // (등급*학점을 모두 더한 값)/(학점을 모두 더한 값) 계산

  document.getElementById('all_grade').innerText = alltotal.toFixed(2);
  //계산값을 해당 위치에 2자리의 소수로 반올림해서 출력
}

//저장된 값을 불러와서 최종 전공 학점 계산
function majorCalculator() {
  var majorgradecreditArray = new Array();
  //각 행의 전공과목 등급*학점 결과값을 저장할 배열
  var majorcreditArray = new Array();
  //각 행의 전공학점을 저장할 배열

  for (var i = 1; i <= parentTbody.rows.length; i++) {
    //각 행의 전공과목 등급*학점 결과값을 구함
    var tbodySearch = document.getElementById('result');
    var trSearch = tbodySearch.childNodes[i];
    var gradeResult = trSearch.childNodes[1].id;
    var creditResult = trSearch.childNodes[2].innerText;
    var majorResult = trSearch.childNodes[3].innerText;
    //각 행 안의 tr 값들을 불러옴

    var majorGradeCredit = Number(gradeResult)*Number(creditResult)

    //각 행의 결과가 전공과목인지 아닌지를 체크
    if (majorResult == "O") {
        //전공과목이 맞다면

        majorgradecreditArray[i] = majorGradeCredit;
        //전공과목 등급*학점 결과값을 배열로 전송
        majorcreditArray[i] = Number(creditResult);
        //전공과목 학점을 배열로 전송
      } else {
        //전공과목이 아니라면
        majorgradecreditArray[i] = 0;
        majorcreditArray[i] = 0;
        //배열로 0을 전송 => 아무것도 전송하지 않으면 배열에 빈 자리가 생겨 NaN를 초래하기 때문
      }

    }

  function sum(array) {
    //각 배열 안의 값을 모두 더하는 메소드
    var totalresult = 0;

    for (var y = 1; y < array.length; y++){
      totalresult += array[y];
    }

    return totalresult;
  }

  var majortotalgc = sum(majorgradecreditArray);
  var majortotalc = sum(majorcreditArray);

  var majortotal = Number(majortotalgc)/Number(majortotalc)

  document.getElementById('major_grade').innerText = majortotal.toFixed(2);

}
