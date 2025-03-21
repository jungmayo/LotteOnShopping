function confirmStatusChange(selectElement) {
    const selectedStatus = selectElement.value; // 선택된 등급
    const row = selectElement.closest('tr'); // select 요소가 속한 tr 찾기
    const memberUid = row.cells[2].innerText; // 세 번째 td에서 UID 가져오기

    console.log("memberUid: ",memberUid)

    const confirmChange = confirm(`해당 상태로 변경하시겠습니까? (${selectedStatus})`);

    if (confirmChange) {
        const updatedData = {
            uid: memberUid, // uid를 포함
            status: selectedStatus // 새 등급
        };

        console.log("updatedData:", updatedData); // updatedData 값 확인

        fetch('/admin/user/member/updateStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // 응답을 JSON 형태로 파싱
                } else {
                    return response.json().then(errorData => {  // 응답이 OK가 아닐 경우 JSON 형태로 에러 메시지 받기
                        throw new Error(`Error ${response.status}: ${errorData.message || 'An error occurred'}`);
                    });
                }
            })
            .then(data => {
                console.log(data.message); // 서버에서 전달된 성공 메시지 출력
                alert('회원 상태가 성공적으로 변경되었습니다.');
                selectElement.value = selectedStatus;
                window.location.reload();
            })
            .catch(error => {
                console.error("Error updating status:", error); // error 객체 출력
                alert('상태 업데이트에 실패했습니다. 다시 시도해주세요.');
            });
    } else {
        // 취소 버튼 클릭 시 아무런 동작을 하지 않음
        console.log('상태 변경이 취소되었습니다.');
    }
}