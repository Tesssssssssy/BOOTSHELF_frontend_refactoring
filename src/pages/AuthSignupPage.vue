<template>
  <div class="loadingio-spinner-spinner" v-if="userStore.isLoading">
    <div class="ldio-f4nnk2ltl0v">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="css-12gtq4k">
    <div class="css-1k8rayr">
      <div class="css-111ukc0">
        <div class="css-1wlmsap">
          <a href="/">
            <img src="@/assets/img/002.png" class="css-1k8svhy" />
          </a>
          <div class="line"></div>
          <div direction="vertical" size="20" class="css-1i0k62c"></div>
          <div
            class="pic-holder"
            @mouseover="showUploadText = true"
            @mouseleave="showUploadText = false"
          >
            <img
              v-if="!selectedProfileImage"
              class="pic"
              :src="defaultProfileImage"
              alt="Default Profile"
            />
            <img v-else class="pic" :src="selectedProfileImageURL" 
            alt="Uploaded Profile"
            />
            <input
              class="uploadProfileInput"
              type="file"
              name="profile_pic"
              id="newProfilePhoto"
              accept="image/*"
              style="opacity: 0"
              @change="handleProfileImageChange"
            />
            <label
              v-if="!selectedProfileImage || showUploadText"
              for="newProfilePhoto"
              class="upload-file-block"
            >
              <div class="text-center">
                <div class="mb-2">
                  <i class="fa fa-camera fa-2x"></i>
                </div>
                <div
                  class="text-uppercase"
                  v-if="!selectedProfileImage || showUploadText"
                >
                  프로필 이미지 <br />
                  업로드
                </div>
              </div>
            </label>
          </div>
          <!-----------------프로필 이미지 업로드----------------->
          <div direction="vertical" size="60" class="css-1bisjhm"></div>
          <div class="css-1b8vwo3">이메일</div>
          <div class="css-666rgn">
            <input
              placeholder="이메일을 입력해 주세요."
              type="string"
              autocapitalize="off"
              class="login-custom-input css-ownijh"
              v-model="email"
              @blur="validateEmail"
            />
          </div>
          <div v-if="!emailValid" class="validation-message">
            {{ emailValidationMessage }}
          </div>
          <div direction="vertical" size="20" class="css-1i0k62c"></div>

          <div class="css-1b8vwo3-1">비밀번호</div>
          <div class="css-666rgn">
            <input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              autocapitalize="off"
              class="login-custom-input css-1f4y3nx"
              v-model="password"
              @blur="validatePassword"
            />
          </div>
          <div v-if="!passwordValid" class="passwordValidation-message">
            {{ passwordValidationMessage }}
          </div>
          <div direction="vertical" size="20" class="css-1i0k62c"></div>
          <div class="css-1b8vwo3-2">이름</div>
          <div class="css-666rgn">
            <input
              placeholder="이름을 입력해주세요."
              type="string"
              autocapitalize="off"
              class="login-custom-input css-ownijh"
              v-model="name"
            />
          </div>
          <div direction="vertical" size="20" class="css-1i0k62c"></div>

          <div class="css-1b8vwo3-3">닉네임</div>
          <div class="css-666rgn">
            <input
              placeholder="닉네임을 입력해주세요."
              type="string"
              autocapitalize="off"
              class="login-custom-input css-ownijh"
              v-model="nickName"
            />
          </div>

          <div class="css-1b8vwo3-new">
            <i class="arrow-icon fas fa-hand-point-right"></i>&nbsp;
            <span class="text" @click="openGuideModal()"
              >인증용 이미지 첨부하는 방법 확인하기</span
            >
          </div>
          <!-- 인증용 이미지 첨부 버튼 영역 -->
          <div class="container">
            <div class="panel">
              <div
                :class="[
                  'button_outer',
                  {
                    file_uploading: isUploading,
                    'file_uploading file_uploaded': isUploaded && !isUploading,
                  },
                ]"
              >
                <div class="btn_upload">
                  <input
                    type="file"
                    id="upload_file"
                    @change="handleFileUpload"
                  />
                  인증용 이미지 업로드
                </div>
                <div class="processing_bar"></div>
                <div class="success_box" v-if="isUploaded"></div>
              </div>
            </div>
            <div class="error_msg" v-if="errorMessage">{{ errorMessage }}</div>
            <div
              class="uploaded_file_view show"
              id="uploaded_view"
              v-if="isUploaded"
            >
              <span
                class="file_remove"
                v-if="isUploaded"
                @click="removeUploadedFile"
                >X</span
              >
              <img :src="uploadedFile" alt="Uploaded Image" />
            </div>
          </div>
          <!-- 인증용 이미지 첨부 버튼 영역 -->
          <div direction="vertical" size="32" class="css-h23ofx"></div>
          <div class="css-17w7nyr"></div>
          <div class="css-8luw5u">
            <button class="css-27eumk" @click="toggleAllAgreements">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3.33331"
                  y="3.33331"
                  width="13.3333"
                  height="13.3333"
                  rx="2"
                  :fill="allAgreements ? '#141617' : 'none'"
                  :stroke="allAgreements ? '#141617' : '#9DA7AE'"
                  stroke-width="1.75"
                ></rect>
                <path
                  v-if="allAgreements"
                  d="M6.8327 10.2727L8.91604 12.1667L13.4994 8"
                  stroke="#FFFFFF"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              전체 약관 동의
            </button>
            <div class="css-1jf7ho2">
              <div
                v-for="(agreement, index) in agreements"
                :key="index"
                class="css-d650kt"
              >
                <button class="css-7hwvbl" @click="toggleAgreement(index)">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      v-if="!agreement.checked"
                      d="M3.33301 10L7.49967 14.1667L16.6663 5"
                      stroke="#B4BFC6"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      v-if="agreement.checked"
                      d="M3.33301 10L7.49967 14.1667L16.6663 5"
                      stroke="#141617"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <div class="css-w2z16z">{{ agreement.label }}</div>
                </button>
                <a class="css-1rvdgmi">보기</a>
              </div>
            </div>
          </div>
          <div direction="vertical" size="40" class="css-ygt1wz"></div>
          <button
            :class="['css-j27xag', { 'button-disabled': !isSubmitEnabled }]"
            :disabled="!isSubmitEnabled"
            @click="signUpData"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  </div>
  <!------------가이드 모달창--------------->
  <div class="css-1gpya5f" v-show="isOpenGuide">
    <div class="css-4oebd2">
      <div class="css-1n1k95p">
        <div class="css-myjkxi" @click="closeGuideModal()">
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16663 4.16669L15.8333 15.8334"
              stroke="#3A3E41"
              stroke-width="1.75"
              stroke-linecap="round"
            ></path>
            <path
              d="M15.8334 4.16669L4.16671 15.8334"
              stroke="#3A3E41"
              stroke-width="1.75"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
      </div>
      <div class="css-1xpr18p">
        <!-- 가이드 이미지 섹션 -->
        <div class="guide-images">
          <!-- 첨부한 이미지 1 -->
          <div class="guide-image-0">
            <p>인증용 이미지 첨부하는 방법</p>
          </div>
          <div class="guide-image">
            <p>STEP 1 : HRD-NET 직업훈련포털 사이트 로그인</p>
          </div>
          <div class="guide-image-1">
            <p>STEP 2 : "나의 정보" 클릭</p>
            <img src="@/assets/img/step-1.png" alt="Step 1: Login to HRD-NET" />
          </div>
          <div class="guide-image-2">
            <p>STEP 3 : "나의 훈련이력" 클릭</p>
            <img src="@/assets/img/step-2.png" alt="Step 1: Login to HRD-NET" />
          </div>
          <div class="guide-image-3">
            <p>STEP 4 : 아래와 같이 수강한 과정 캡처 후 이미지 첨부</p>
            <img src="@/assets/img/step-3.png" alt="Step 1: Login to HRD-NET" />
          </div>
        </div>
        <!-- /가이드 이미지 섹션 -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "../stores/useUserStore";

export default {
  name: "AuthSignupPage",
  computed: {
    ...mapStores(useUserStore),
    isSubmitEnabled() {
      const isUserInfoFilled =
        this.email &&
        this.password &&
        this.name &&
        this.nickName;

      const isAllRequiredAgreed = this.agreements
        .slice(0, 3)
        .every((agreement) => agreement.checked);

      const isEmailValid = this.emailValid;
      const isPasswordValid = this.passwordValid;

      return (
        isUserInfoFilled &&
        isAllRequiredAgreed &&
        isEmailValid &&
        isPasswordValid
      );
    },
  },
  data() {
    return {

      email: "",
      password: "",
      name: "",
      nickName: "",

      defaultProfileImage: require("@/assets/img/profile.jpg"),
      selectedProfileImage: null, // 프로필 이미지
      selectedProfileImageURL: "",
      showUploadText: false,

      isUploading: false,
      isUploaded: false,
      uploadProgress: 0,
      uploadedFile: null, // 인증용 이미지
      errorMessage: "",

      isOpenGuide: false,
      allAgreements: false,

      emailValid: true, // 이메일 유효성 상태
      emailValidationMessage: "", // 이메일 유효성 검사 메시지

      passwordValid: true, // 비밀번호 유효성 상태
      passwordValidationMessage: "", // 비밀번호 유효성 검사 메시지

      agreements: [
        { label: "[필수] 만 14세 이상", checked: false },
        { label: "[필수] 서비스 약관 동의", checked: false },
        { label: "[필수] 개인정보처리방침 및 제3자 제공 동의", checked: false },
        { label: "[선택] 광고성 정보 수신 동의", checked: false },
      ],
    };
  },
  mounted() {
    this.$root.hideHeaderAndFooter = true;
  },
  methods: {
    async signUpData() {

      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        nickName: this.nickName,
        programName: this.userStore.courseName, // Pinia store에서 가져온 추가 데이터 포함
      };

      await this.userStore.signUpData(user, this.selectedProfileImage);
      if (this.userStore.isSuccess) {
        this.$router.push({ path: "/email/verify" });
      }
    },
    handleProfileImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedProfileImage = file;
        this.selectedProfileImageURL = URL.createObjectURL(file);
        this.showUploadText = false; // 이미지가 선택되면 텍스트를 숨깁니다.
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();

      if (["gif", "png", "jpg", "jpeg"].indexOf(ext) === -1) {
        this.errorMessage = "이미지 파일이 아닙니다.";
      } else if (file.size === 0) { // 빈 파일 확인
        this.errorMessage = "빈 파일을 업로드할 수 없습니다.";
      } else if (file.size > 5000000) { // 5MB 이상의 파일을 제한
        this.errorMessage = "파일이 너무 큽니다. 5MB 이하로 업로드해주세요.";
      } else {
        this.errorMessage = "";
        this.isUploading = true;
        const reader = new FileReader();

        reader.onload = () => {
          setTimeout(() => {
            this.uploadedFile = reader.result;
            this.userStore.checkCourse(file);
            this.isUploaded = true;
            this.isUploading = false;
          }, 3000);
        };

        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            this.uploadProgress = Math.round((e.loaded / e.total) * 100);
          }
        };

        reader.readAsDataURL(file);
      }
    },
    removeUploadedFile() {
      this.uploadedFile = null;
      this.isUploaded = false;
      this.uploadProgress = 0;
    },

    openGuideModal() {
      this.isOpenGuide = true;
    },
    closeGuideModal() {
      this.isOpenGuide = false;
    },

    toggleAllAgreements() {
      this.allAgreements = !this.allAgreements;
      this.agreements.forEach(
        (agreement) => (agreement.checked = this.allAgreements)
      );
    },
    toggleAgreement(index) {
      this.agreements[index].checked = !this.agreements[index].checked;
      this.allAgreements = this.agreements.every(
        (agreement) => agreement.checked
      );
    },
    validateEmail() {
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
      this.emailValid = regex.test(this.email);
      this.emailValidationMessage = this.emailValid
        ? ""
        : "! 올바른 이메일 형식( test@example.com )으로 입력해주세요.";
    },

    validatePassword() {
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
      this.passwordValid = regex.test(this.password);
      this.passwordValidationMessage = this.passwordValid
        ? ""
        : "! 패스워드는 대/소문자, 특수문자, 숫자를 반드시 포함한 8글자 이상이어야 합니다.";
    },
  },
};
</script>

<style scoped>
body {
  display: block;
  margin: 8px;
}

* {
  line-height: 1.5;
  box-sizing: border-box;
  letter-spacing: normal;
}

* {
  margin: 0;
  line-height: 1.5;
}

body,
html {
  padding: 0;
  margin: 0;
  line-height: 1.5;
  font-family: Pretendard, serif;
}

body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  font-size: 1.4rem;
  box-sizing: border-box;
}

element.style {
  overflow: hidden;
}

.css-1k8rayr {
  width: 1000px;
  height: fit-content;
  padding: 0px 24px 60px;
  margin: 60px 0px;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.css-111ukc0 {
  width: 450px;
  overflow: visible;
  margin: auto;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-flex: 1;
  flex-grow: 1;
}

:not(svg) {
  transform-origin: 0px 0px;
}
svg {
  width: 20;
  height: 20;
  fill: none;
}

svg:not(:root) {
  overflow-clip-margin: content-box;
  overflow: hidden;
}

.css-1k8svhy {
  width: 248px;
  object-fit: contain;
}

.css-profile {
  display: block;
  margin: 0 auto;
  width: 120px;
  object-fit: contain;
}

.css-1bisjhm {
  width: 100%;
  height: 60px;
}

.css-666rgn {
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  box-sizing: border-box;
  gap: 8px;
  background: rgb(246, 249, 250);
  border-radius: 12px;
  position: relative;
}

input {
  border: none;
  background: none;
  outline: none;
  appearance: none;
}

.css-ownijh {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background: rgb(246, 249, 250);
  border-radius: 8px;
  outline: none;
  border: none;
  caret-color: rgb(20, 22, 23);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  color: rgb(20, 22, 23);
  font-size: 14px;
  width: 72%;
  height: 21px;
  padding: 0px;
}

input[type="password" i] {
  padding-block: 1px;
  padding-inline: 2px;
}

.css-1f4y3nx {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background: rgb(246, 249, 250);
  border-radius: 8px;
  outline: none;
  border: none;
  caret-color: rgb(20, 22, 23);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  color: rgb(20, 22, 23);
  font-size: 14px;
  width: 100%;
  height: 21px;
  padding: 0px;
}

.css-1i0k62c {
  width: 100%;
  height: 20px;
}
.validation-message {
  font-size: 10px;
  color: red;
  margin-top: 10px;
  margin-right: 150px;
  font-weight: bold;
}

.passwordValidation-message {
  font-size: 10px;
  color: red;
  margin-top: 10px;
  margin-right: 54px;
  font-weight: bold;
  width: max-content;
}
.css-ygt1wz {
  width: 100%;
  height: 40px;
}

.css-17w7nyr {
  width: 100%;
  height: 1px;
  background: #eef3f6;
}

.css-8luw5u {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
}

a,
button {
  text-decoration: none;
  cursor: pointer;
}

button {
  background: unset;
  border: unset;
  padding: unset;
}

.css-27eumk {
  background: none;
  border: none;
  padding: 0px;
  margin-top: 20px;
  appearance: none;
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: rgb(20, 22, 23);
}

.css-1jf7ho2 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.css-d650kt {
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.css-7hwvbl {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  appearance: none;
  display: flex;
  gap: 12px;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
}

/*----------체크박스 추가------------*/

svg {
  width: 20;
  height: 20;
  fill: none;
}

.css-w2z16z {
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 21px;
  color: rgb(129, 137, 143);
}

.css-1rvdgmi {
  font-family: Pretendard, -apple-system, “system-ui”, "Malgun Gothic",
    "맑은 고딕", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  text-align: center;
  text-decoration-line: underline;
  color: rgb(129, 137, 143);
  cursor: pointer;
  text-decoration: underline; /* 밑줄 추가 */
  cursor: pointer; /* 마우스 호버 시 손가락 커서로 변경 */
}

.line {
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
  background-color: #d4d4d4;
}

/* 흐린 선 */
.line::before {
  content: "인증회원으로 가입하기";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #8b8b8b;
  padding: 0 15px;
  text-align: center;
  font-size: 14px; /* 글씨 크기 조정 */
  line-height: 1.4; /* 줄 간격 조정 */
  font-weight: bold;
}

.css-j27xag {
  border: none;
  cursor: pointer;
  width: 99.5%;
  height: 56px;
  background: #541d7a;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: rgb(255, 255, 255);
  border-radius: 60px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 8px;
}
.button-disabled {
  opacity: 0.3;
}
.css-1wlmsap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  max-width: 1500px; /* 또는 다른 원하는 최대 가로 사이즈 설정 */
  margin: 0 auto; /* 화면 중앙에 정렬하기 위해 추가 */
}

.css-12gtq4k {
  z-index: 22;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  background: rgb(246, 249, 250);
}

.css-16q6yfy * {
  word-break: normal;
  white-space: nowrap;
  box-sizing: border-box;
}

/* 이미지 첨부 버튼 */

/*---------------------------------*/

.css-1b8vwo3::after {
  position: relative;
  left: 2px;
  top: -2px;
  content: "*";
  color: rgb(255, 114, 98);
}
.css-1b8vwo3-1::after {
  position: relative;
  left: 2px;
  top: -2px;
  content: "*";
  color: rgb(255, 114, 98);
}
.css-1b8vwo3-2::after {
  position: relative;
  left: 2px;
  top: -2px;
  content: "*";
  color: rgb(255, 114, 98);
}
.css-1b8vwo3-3::after {
  position: relative;
  left: 2px;
  top: -2px;
  content: "*";
  color: rgb(255, 114, 98);
}

.css-1b8vwo3 {
  font-size: 14px;
  color: rgb(85, 89, 105);
  margin-bottom: 8px;
  position: relative;
  font-weight: bold;
  padding-right: 389px;
}

.css-1b8vwo3-1 {
  font-size: 14px;
  color: rgb(85, 89, 105);
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
  font-weight: bold;
  padding-right: 374px;
}

.css-1b8vwo3-2 {
  font-size: 14px;
  color: rgb(85, 89, 105);
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
  font-weight: bold;
  padding-right: 400px;
}

.css-1b8vwo3-3 {
  font-size: 14px;
  color: rgb(85, 89, 105);
  margin-top: 8px;
  margin-bottom: 8px;
  position: relative;
  font-weight: bold;
  padding-right: 386px;
}

.css-1b8vwo3-new {
  font-size: 14px;
  color: rgb(85, 89, 105);
  margin-bottom: 8px;
  position: relative;
  font-weight: bold;
  margin-top: 30px;
  padding-right: 170px;
  cursor: pointer;
}

.text {
  text-decoration: underline;
}

/*-------------프로필 이미지 업로드---------------*/
.h1 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.profile-pic-wrapper {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pic-holder {
  text-align: center;
  position: relative;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  /* overflow: hidden;
  display: flex; */
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.pic-holder .pic {
  height: 100%;
  width: 100%;
  /* -o-object-fit: cover; */
  object-fit: cover;
  /* -o-object-position: center; */
  object-position: center;
  border-radius: 50%; /* 원 형태로 만듦 */
}

.pic-holder .upload-file-block,
.pic-holder .upload-loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(90, 92, 105, 0.7);
  color: #f8f9fc;
  font-size: 12px;
  font-weight: 600;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pic-holder .upload-file-block {
  cursor: pointer;
}

.pic-holder:hover .upload-file-block,
.uploadProfileInput:focus ~ .upload-file-block {
  opacity: 1;
}

.pic-holder.uploadInProgress .upload-file-block {
  display: none;
}

.pic-holder.uploadInProgress .upload-loader {
  opacity: 1;
}

/* Snackbar css */
.snackbar {
  visibility: hidden;
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 14px;
  transform: translateX(-50%);
}

.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.text-uppercase {
  font-size: 16px;
}
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
/*-------------프로필 이미지 업로드---------------*/
/*-------------인증용 이미지 업로드---------------*/

body {
  background: #282c34;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
}

.container {
  max-width: 1100px;
  padding: 0 20px;
  margin: -25px auto 40px;
}

.panel {
  margin: 40px 18px 20px -233px;
  max-width: 500px;
  text-align: center;
}

.button_outer {
  background: #541d7a;
  border-radius: 30px;
  text-align: center;
  height: 50px;
  width: 200px;
  display: inline-block;
  transition: 0.2s;
  position: relative;
  overflow: hidden;
}

.btn_upload {
  padding: 14px 26px 12px;
  color: #fff;
  text-align: center;
  position: relative;
  display: inline-block;
  overflow: hidden;
  z-index: 3;
  white-space: nowrap;
}

.btn_upload input {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  width: 100%;
  height: 105%;
  cursor: pointer;
  opacity: 0;
}

.file_uploading {
  width: 100%;
  height: 10px;
  margin-top: 20px;
  background: #fff;
}

.file_uploading .btn_upload {
  display: none;
}

.processing_bar {
  position: absolute;
  left: 30px;
  top: 0;
  width: 0;
  height: 100%;
  border-radius: 30px;
  background: #541d7a;
  transition: 3s;
}

.file_uploading .processing_bar {
  width: 100%;
}

.success_box {
  display: none;
  width: 50px;
  height: 50px;
  position: relative;
}

.success_box:before {
  content: "";
  display: block;
  width: 9px;
  height: 18px;
  border-bottom: 6px solid #fff;
  border-right: 6px solid #fff;
  transform: rotate(45deg);
  position: absolute;
  left: 17px;
  top: 10px;
}

.file_uploaded .success_box {
  display: inline-block;
}

.file_uploaded {
  margin-top: 0;
  width: 50px;
  background: #541d7a;
  height: 50px;
}

.uploaded_file_view {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
  position: relative;
  transition: 0.2s;
  opacity: 0;
  border: 2px solid #fff;
  padding: 15px;
}

.file_remove {
  width: 30px;
  height: 30px;
  border-radius: 0.2rem;
  display: block;
  position: absolute;
  background: #541d7a;
  line-height: 30px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  right: -15px;
  top: -15px;
  font-weight: bold;
  font-family: Pretendard;
  font-style: normal;
}

.file_remove:hover {
  background: #8a2933;
  transition: 0.2s;
}

.uploaded_file_view img {
  max-width: 100%;
}

.uploaded_file_view.show {
  opacity: 1;
}

.error_msg {
  text-align: center;
  color: #ed5464;
  font-weight: bold;
}
/*--------------가이드 모달----------------*/
body,
html {
  padding: 0;
  margin: 0;
  line-height: 1.5;
  font-family: "Noto Sans", sans-serif; /* 폰트 변경 */
}

body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  font-size: 1.4rem;
  box-sizing: border-box;
}

* {
  line-height: 1.5;
  box-sizing: border-box;
  letter-spacing: normal;
}

* {
  margin: 0;
  line-height: 1.5;
}

.css-1gpya5f {
  overflow-y: auto; /* 세로 스크롤을 자동으로 표시하도록 설정 */
  z-index: 22;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20, 22, 23, 0.4);
  scrollbar-width: none;
}

.css-4oebd2 {
  width: 600px;
  height: 800px;
  padding: 0px 20px 40px;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x: auto; /* 스크롤바 자동 생성 */
}

.css-1n1k95p {
  width: 100%;
  height: 38px;
  position: relative;
  flex-shrink: 0;
}

.css-myjkxi {
  position: absolute;
  top: 18px;
  right: 0px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 26px;
  color: rgb(58, 62, 65);
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.css-1xpr18p {
  width: 550px;
  overflow: hidden;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

/* 추가한 CSS 스타일 */
.guide-images {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}

.guide-image {
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 30px;
  text-align: left;
}

.guide-image-0 {
  margin-bottom: 30px;
  margin-left: 120px;
  text-align: center;
}

.guide-image-0 p {
  font-weight: bold;
  margin: 0;
  font-size: 24px;
}

.guide-image img {
  width: 600px;
  height: 160px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 8px;
}

.guide-image p {
  font-weight: bold;
  margin: 0;
  font-size: 18px;
}

.guide-image-1 {
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 30px;
  text-align: left;
}

.guide-image-1 p {
  font-weight: bold;
  margin: 0;
  font-size: 18px;
}

.guide-image-1 img {
  width: 500px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 8px;
}

.guide-image-2 {
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 30px;
  text-align: left;
  font-size: 18px;
}

.guide-image-2 p {
  font-weight: bold;
  margin: 0;
}

.guide-image-2 img {
  width: 500px;
  height: 110px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 8px;
}

.guide-image-3 {
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 30px;
  text-align: left;
}

.guide-image-3 p {
  font-weight: bold;
  margin: 0;
  font-size: 18px;
}

.guide-image-3 img {
  width: 500px;
  height: 160px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 8px;
}
/*--------로딩창-------------*/
.loadingio-spinner-spinner {
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 1000; /* 다른 요소 위에 표시하기 위한 z-index 값 */
  width: 100%; /* 전체 화면을 커버 */
  height: 100%;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
}
@keyframes ldio-f4nnk2ltl0v {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.ldio-f4nnk2ltl0v div {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999; /* 다른 요소 위에 표시하기 위한 z-index 값 */
  animation: ldio-f4nnk2ltl0v linear 1s infinite;
  background: #fe718d;
  width: 18.240000000000002px;
  height: 36.480000000000004px;
  border-radius: 9.120000000000001px / 18.240000000000002px;
  transform-origin: 9.120000000000001px 79.04px;
}
.ldio-f4nnk2ltl0v div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
  background: #fe718d;
}
.ldio-f4nnk2ltl0v div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
  background: #f47e60;
}
.ldio-f4nnk2ltl0v div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
  background: #f8b26a;
}
.ldio-f4nnk2ltl0v div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
  background: #abbd81;
}
.ldio-f4nnk2ltl0v div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
  background: #849b87;
}
.ldio-f4nnk2ltl0v div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
  background: #6492ac;
}
.ldio-f4nnk2ltl0v div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
  background: #637cb5;
}
.ldio-f4nnk2ltl0v div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
  background: #6a63b6;
}
.ldio-f4nnk2ltl0v div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
  background: #fe718d;
}
.ldio-f4nnk2ltl0v div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
  background: #f47e60;
}
.ldio-f4nnk2ltl0v div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
  background: #f8b26a;
}
.ldio-f4nnk2ltl0v div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
  background: #abbd81;
}
.loadingio-spinner-spinner-pz89b3jiaad {
  width: 304px;
  height: 304px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-f4nnk2ltl0v div {
  box-sizing: content-box;
}
</style>
