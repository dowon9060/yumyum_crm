// 매장 관리 관련 함수
let isModalOpen = false;

function openStoreForm() {
    if (isModalOpen) return;
    
    const modal = document.getElementById('storeModal');
    if (modal) {
        modal.style.display = 'block';
        isModalOpen = true;
        initializeTimeSelectors();
    }
}

function closeStoreForm() {
    const modal = document.getElementById('storeModal');
    if (modal) {
        modal.style.display = 'none';
        isModalOpen = false;
    }
}

function initializeTimeSelectors() {
    const timeSelectors = document.querySelectorAll('.time-selector');
    timeSelectors.forEach(selector => {
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, '0');
            const option = document.createElement('option');
            option.value = hour + ':00';
            option.textContent = hour + ':00';
            selector.appendChild(option);
        }
    });
}

// 주소 검색
function searchAddress(target) {
    new daum.Postcode({
        oncomplete: function(data) {
            document.getElementById(target + 'Address').value = data.address;
            document.getElementById(target + 'AddressDetail').focus();
        }
    }).open();
}

// 파일 업로드 미리보기
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모달 닫기 버튼 이벤트 리스너
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeStoreForm();
        });
    });
});