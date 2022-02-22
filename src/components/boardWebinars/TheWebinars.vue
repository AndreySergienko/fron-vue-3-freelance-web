<template>
  <div class="documents backdrop-filter-auto">
    <div class="documents__inner">
      <div class="documents__filter">

        <div class="documents__button">
          <button class="btn btn-primary-category" type="button" @click="openModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.07689 2.41025C8.35894 2.20513 7.23074 2 6.41023 2C5.58973 2 4.46153 2.20513 3.74358 2.41025C3.02564 2.51282 2.51282 3.02564 2.41025 3.74358C2.20513 4.46153 2 5.58973 2 6.41023C2 7.23074 2.20513 8.35894 2.30769 9.07689C2.41025 9.79483 3.02564 10.3076 3.64102 10.4102C4.35896 10.5128 5.48716 10.7179 6.30767 10.7179C7.12818 10.7179 8.25638 10.5128 8.97432 10.4102C9.69227 10.3076 10.2051 9.69227 10.3077 9.07689C10.4102 8.35894 10.6153 7.23074 10.6153 6.41023C10.6153 5.58973 10.4102 4.46153 10.3077 3.74358C10.3077 3.02564 9.79483 2.51282 9.07689 2.41025Z" fill="#DDDDDD"/>
              <path d="M9.07687 13.6922C8.35892 13.5896 7.23072 13.3845 6.41021 13.3845C5.58971 13.3845 4.46151 13.5896 3.74356 13.6922C3.02562 13.7948 2.5128 14.4101 2.41023 15.0255C2.30767 15.7435 2.10254 16.8717 2.10254 17.6922C2.10254 18.5127 2.30767 19.6409 2.41023 20.3588C2.5128 21.0768 3.12818 21.5896 3.74356 21.6922C4.46151 21.7947 5.58971 21.9999 6.41021 21.9999C7.23072 21.9999 8.35892 21.7947 9.07687 21.6922C9.79481 21.5896 10.3076 20.9742 10.4102 20.3588C10.5127 19.6409 10.7179 18.5127 10.7179 17.6922C10.7179 16.8717 10.5127 15.7435 10.4102 15.0255C10.3076 14.3076 9.79481 13.7948 9.07687 13.6922Z" fill="#DDDDDD"/>
              <path d="M15.0258 10.4104C15.7438 10.513 16.872 10.7181 17.6925 10.7181C18.513 10.7181 19.6412 10.513 20.3591 10.4104C21.0771 10.3078 21.5899 9.69248 21.6924 9.0771C21.795 8.35916 22.0001 7.23096 22.0001 6.41045C22.0001 5.58994 21.795 4.46174 21.6924 3.74379C21.5899 3.02585 20.9745 2.51303 20.3591 2.41047C19.6412 2.3079 18.513 2.10278 17.6925 2.10278C16.872 2.10278 15.7438 2.3079 15.0258 2.41047C14.3079 2.51303 13.795 3.12841 13.6925 3.74379C13.5899 4.46174 13.3848 5.58994 13.3848 6.41045C13.3848 7.23096 13.5899 8.35916 13.6925 9.0771C13.795 9.79505 14.3079 10.3078 15.0258 10.4104Z" fill="#DDDDDD"/>
              <path d="M20.3591 13.6922C19.6412 13.5896 18.513 13.3845 17.6925 13.3845C16.872 13.3845 15.7438 13.5896 15.0258 13.6922C14.3079 13.7948 13.795 14.4101 13.6925 15.0255C13.5899 15.7435 13.3848 16.8717 13.3848 17.6922C13.3848 18.5127 13.5899 19.6409 13.6925 20.3588C13.795 21.0768 14.4104 21.5896 15.0258 21.6922C15.7438 21.7947 16.872 21.9999 17.6925 21.9999C18.513 21.9999 19.6412 21.7947 20.3591 21.6922C21.0771 21.5896 21.5899 20.9742 21.6924 20.3588C21.795 19.6409 22.0001 18.5127 22.0001 17.6922C22.0001 16.8717 21.795 15.7435 21.6924 15.0255C21.5899 14.3076 21.0771 13.7948 20.3591 13.6922Z" fill="#DDDDDD"/>
            </svg>
            Категория
          </button>
        </div>

        <div class="form__control form__control-documents documents__form">
          <div>
            <input type="text" placeholder=" " class="input input-search" id="documents" list="items" @keydown.enter="searchElement" v-model="input">
            <label for="documents" class="label">Найти вебинар</label>
            <datalist id="items">
              <option v-for="webinar in getWebinarsDatalist" :data-id="webinar._id" >{{ webinar.title }}</option>
            </datalist>
            <div class="icon__visible" @click="searchElement">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_507_180)">
                  <path d="M9.82943 19.6684C11.8531 19.6684 13.7227 19.0516 15.2838 18.0109L20.9309 23.658C21.3744 24.1013 22.1068 24.1013 22.5691 23.658L23.6677 22.5594C24.111 22.1161 24.111 21.3837 23.6677 20.9212L18.0014 15.2933C19.0419 13.7322 19.6589 11.8627 19.6589 9.83895C19.6589 4.42313 15.2453 0.00952148 9.82943 0.00952148C4.41361 0.00952148 0 4.42313 0 9.83895C0 15.2546 4.39433 19.6684 9.82943 19.6684ZM9.82943 3.8642C13.1252 3.8642 15.8042 6.5432 15.8042 9.83895C15.8042 13.1347 13.1252 15.8137 9.82943 15.8137C6.53368 15.8137 3.85468 13.1347 3.85468 9.83895C3.85468 6.5432 6.53368 3.8642 9.82943 3.8642Z" fill="#DDDDDD"/>
                </g>
                <defs>
                  <clipPath id="clip0_507_180">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="create">
        <div :class="['arrow-back', {disabled: isDisabledBack || lessThanThree}]" @click="backArrow">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_713_151)">
              <path d="M0.952404 7.41052C1.7434 6.47852 2.8694 6.00152 4.0044 6.00152C4.9174 6.00152 5.8384 6.31352 6.5914 6.95052L15.0114 14.1025L23.4314 6.95152C25.1144 5.52152 27.6394 5.72652 29.0704 7.41052C30.5004 9.09652 30.2944 11.6185 28.6104 13.0505L17.6004 22.4015C16.1074 23.6705 13.9144 23.6705 12.4224 22.4015L1.4114 13.0505C-0.272596 11.6185 -0.477596 9.09552 0.952404 7.41052Z" fill="url(#paint0_linear_713_151)"/>
            </g>
            <defs>
              <linearGradient id="paint0_linear_713_151" x1="15.0112" y1="23.3533" x2="15.0112" y2="6.00002" gradientUnits="userSpaceOnUse">
                <stop stop-color="#DFC352"/>
                <stop offset="1" stop-color="#9D8935"/>
              </linearGradient>
              <clipPath id="clip0_713_151">
                <rect width="30.021" height="30.021" fill="white" transform="translate(30.0215 30.021) rotate(180)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div :class="['arrow-next', {disabled: isDisabledNext || lessThanThree}]" @click="nextArrow">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_713_151)">
              <path d="M0.952404 7.41052C1.7434 6.47852 2.8694 6.00152 4.0044 6.00152C4.9174 6.00152 5.8384 6.31352 6.5914 6.95052L15.0114 14.1025L23.4314 6.95152C25.1144 5.52152 27.6394 5.72652 29.0704 7.41052C30.5004 9.09652 30.2944 11.6185 28.6104 13.0505L17.6004 22.4015C16.1074 23.6705 13.9144 23.6705 12.4224 22.4015L1.4114 13.0505C-0.272596 11.6185 -0.477596 9.09552 0.952404 7.41052Z" fill="url(#paint0_linear_713_151)"/>
            </g>
            <defs>
              <linearGradient id="paint0_linear_713_151" x1="15.0112" y1="23.3533" x2="15.0112" y2="6.00002" gradientUnits="userSpaceOnUse">
                <stop stop-color="#DFC352"/>
                <stop offset="1" stop-color="#9D8935"/>
              </linearGradient>
              <clipPath id="clip0_713_151">
                <rect width="30.021" height="30.021" fill="white" transform="translate(30.0215 30.021) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="create__inner">
          <div class="create__items" v-if="!getCurrentWebinar.length">
            <div :class="['create__item create__item-add', {active: activeWebComputed === 'all'}]" v-if="currentStep === 0" data-id="add" @click="selectWebinar" >
              <div class="symbol">
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="add">
                  <g clip-path="url(#clip0_521_304)" data-id="add">
                    <path data-id="add" d="M27.4122 0.823486C12.6545 0.823486 0.647461 12.8295 0.647461 27.5882C0.647461 42.3469 12.6545 54.3529 27.4122 54.3529C42.1698 54.3529 54.1769 42.3469 54.1769 27.5882C54.1769 12.8295 42.1698 0.823486 27.4122 0.823486ZM40.2798 29.647H29.471V40.9705C29.471 42.107 28.5486 43.0294 27.4122 43.0294C26.2757 43.0294 25.3533 42.107 25.3533 40.9705V29.647H14.5445C13.408 29.647 12.4857 28.7247 12.4857 27.5882C12.4857 26.4517 13.408 25.5294 14.5445 25.5294H25.3533V15.2353C25.3533 14.0988 26.2757 13.1764 27.4122 13.1764C28.5486 13.1764 29.471 14.0988 29.471 15.2353V25.5294H40.2798C41.4163 25.5294 42.3386 26.4517 42.3386 27.5882C42.3386 28.7247 41.4163 29.647 40.2798 29.647Z" fill="#99FFAF"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_521_304">
                      <rect width="53.5294" height="53.5294" fill="white" transform="translate(0.647461 0.823486)"/>
                    </clipPath>
                  </defs>
                </svg>

              </div>
            </div>
            <div :class="['create__item', {active: activeWebComputed === item.title}, {isSale: item.isSale}]" v-for="item in getWebinars" :data-id="item._id"  @click="selectWebinar">
              <div class="create__name">{{ item.title }}</div>
              <div class="sale" v-if="item.isSale">
                <div class="create__price">
                  <div class="sale__sold">{{ item.oldPrice }}</div>
                  <div class="sale__primary">{{ Math.floor(item.currentPrice) }}</div>
                  <span class="create__price-span create__price-span-sold">
                     <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_846_157)">
                    <path d="M8.61 9.07143C10.605 9.07143 12 7.61152 12 5.5129C12 3.41429 10.605 2 8.61 2H4.78125C4.62593 2 4.5 2.13193 4.5 2.29464V7.3682H3.28125C3.12593 7.3682 3 7.50012 3 7.66284V8.77679C3 8.9395 3.12593 9.07143 3.28125 9.07143H4.5V9.85714H3.28125C3.12593 9.85714 3 9.98907 3 10.1518V11.1339C3 11.2966 3.12593 11.4286 3.28125 11.4286H4.5V12.7054C4.5 12.8681 4.62593 13 4.78125 13H6.15375C6.30907 13 6.435 12.8681 6.435 12.7054V11.4286H10.2188C10.3741 11.4286 10.5 11.2966 10.5 11.1339V10.1518C10.5 9.98907 10.3741 9.85714 10.2188 9.85714H6.435V9.07143H8.61ZM6.435 3.68801H8.28C9.375 3.68801 10.035 4.40276 10.035 5.5129C10.035 6.63824 9.375 7.3682 8.25 7.3682H6.435V3.68801Z" fill="#DFC352"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_846_157" x="0" y="0" width="15" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_846_157"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_846_157" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                </span>
                </div>
              </div>
              <div class="create__price" v-else>{{ item.oldPrice }}
                <span class="create__price-span">
                  <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_846_157)">
                    <path d="M8.61 9.07143C10.605 9.07143 12 7.61152 12 5.5129C12 3.41429 10.605 2 8.61 2H4.78125C4.62593 2 4.5 2.13193 4.5 2.29464V7.3682H3.28125C3.12593 7.3682 3 7.50012 3 7.66284V8.77679C3 8.9395 3.12593 9.07143 3.28125 9.07143H4.5V9.85714H3.28125C3.12593 9.85714 3 9.98907 3 10.1518V11.1339C3 11.2966 3.12593 11.4286 3.28125 11.4286H4.5V12.7054C4.5 12.8681 4.62593 13 4.78125 13H6.15375C6.30907 13 6.435 12.8681 6.435 12.7054V11.4286H10.2188C10.3741 11.4286 10.5 11.2966 10.5 11.1339V10.1518C10.5 9.98907 10.3741 9.85714 10.2188 9.85714H6.435V9.07143H8.61ZM6.435 3.68801H8.28C9.375 3.68801 10.035 4.40276 10.035 5.5129C10.035 6.63824 9.375 7.3682 8.25 7.3682H6.435V3.68801Z" fill="#DFC352"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_846_157" x="0" y="0" width="15" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_846_157"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_846_157" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                </span>
              </div>
              <div class="create__img">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M118.554 53.5929C118.162 53.1634 117.608 52.9164 117.026 52.9164H112.956C112.956 52.9164 98.8684 26.1138 98.14 24.7234C97.3587 23.2326 96.1763 21.9275 94.4079 21.9275C85.8014 21.9275 77.7698 20.0911 71.7927 16.7561C68.8105 15.0923 66.5619 13.1459 65.1881 11.1002V5.18821C65.1881 2.32276 62.8653 0 59.9999 0C57.1344 0 54.8117 2.32276 54.8117 5.18821V11.1002C53.4378 13.1459 51.1893 15.0923 48.2071 16.7561C42.2297 20.0908 34.1981 21.9275 25.5917 21.9275C23.8233 21.9275 22.7581 23.0121 21.8595 24.7234C19.7585 28.7245 7.04354 52.9164 7.04354 52.9164H2.97364C2.39205 52.9164 1.83717 53.1615 1.44546 53.5914C1.05375 54.0215 0.861782 54.5963 0.914961 55.1756C2.05481 67.551 12.4642 77.2419 25.1372 77.2419C37.8102 77.2419 48.2195 67.551 49.3594 55.1756C49.4126 54.5969 49.2196 54.0225 48.8281 53.5929C48.4367 53.1634 47.882 52.9164 47.3007 52.9164H43.2305L30.9373 29.4963C40.5153 28.7282 48.8758 25.9188 54.8119 21.7915V107.029H31.2966C27.7149 107.029 24.8113 109.933 24.8113 113.515C24.8113 117.096 27.7149 120 31.2966 120H87.7062C91.2879 120 94.1915 117.096 94.1915 113.515C94.1915 109.933 91.2879 107.029 87.7062 107.029H65.1884V21.7915C71.1245 25.9188 79.485 28.7284 89.0627 29.4963L76.7695 52.9164H72.6993C72.1177 52.9164 71.5629 53.1615 71.1712 53.5914C70.7794 54.0215 70.5875 54.5963 70.6409 55.1756C71.7805 67.551 82.1901 77.2419 94.8631 77.2419C107.536 77.2419 117.945 67.551 119.085 55.1756C119.139 54.5969 118.945 54.0228 118.554 53.5929ZM34.4412 52.9164H15.8329L25.1369 35.1909L34.4412 52.9164ZM85.5586 52.9164L94.8629 35.1906L104.167 52.9164H85.5586Z" fill="#151515" fill-opacity="0.15"/>
                </svg>

              </div>
            </div>
          </div>
          <div class="create__items" v-else>
            <div :class="['create__item', {active: activeWebComputed === webinar.title}, {isSale: webinar.isSale}]"  v-for="webinar in getCurrentWebinar" :data-id="webinar._id"  @click="selectWebinar">
              <div class="create__name">{{ webinar.title }}</div>
              <div class="create__price" v-if="webinar.isSale">{{ Math.floor(webinar.currentPrice) }}
                <span class="create__price-span">
                  <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_846_157)">
                    <path d="M8.61 9.07143C10.605 9.07143 12 7.61152 12 5.5129C12 3.41429 10.605 2 8.61 2H4.78125C4.62593 2 4.5 2.13193 4.5 2.29464V7.3682H3.28125C3.12593 7.3682 3 7.50012 3 7.66284V8.77679C3 8.9395 3.12593 9.07143 3.28125 9.07143H4.5V9.85714H3.28125C3.12593 9.85714 3 9.98907 3 10.1518V11.1339C3 11.2966 3.12593 11.4286 3.28125 11.4286H4.5V12.7054C4.5 12.8681 4.62593 13 4.78125 13H6.15375C6.30907 13 6.435 12.8681 6.435 12.7054V11.4286H10.2188C10.3741 11.4286 10.5 11.2966 10.5 11.1339V10.1518C10.5 9.98907 10.3741 9.85714 10.2188 9.85714H6.435V9.07143H8.61ZM6.435 3.68801H8.28C9.375 3.68801 10.035 4.40276 10.035 5.5129C10.035 6.63824 9.375 7.3682 8.25 7.3682H6.435V3.68801Z" fill="#DFC352"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_846_157" x="0" y="0" width="15" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_846_157"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_846_157" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                </span>
              </div>
              <div class="sale" v-else>
                <div class="create__price">
                  {{ webinar.currentPrice }}
                  <span class="create__price-span">
                  <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_846_157)">
                    <path d="M8.61 9.07143C10.605 9.07143 12 7.61152 12 5.5129C12 3.41429 10.605 2 8.61 2H4.78125C4.62593 2 4.5 2.13193 4.5 2.29464V7.3682H3.28125C3.12593 7.3682 3 7.50012 3 7.66284V8.77679C3 8.9395 3.12593 9.07143 3.28125 9.07143H4.5V9.85714H3.28125C3.12593 9.85714 3 9.98907 3 10.1518V11.1339C3 11.2966 3.12593 11.4286 3.28125 11.4286H4.5V12.7054C4.5 12.8681 4.62593 13 4.78125 13H6.15375C6.30907 13 6.435 12.8681 6.435 12.7054V11.4286H10.2188C10.3741 11.4286 10.5 11.2966 10.5 11.1339V10.1518C10.5 9.98907 10.3741 9.85714 10.2188 9.85714H6.435V9.07143H8.61ZM6.435 3.68801H8.28C9.375 3.68801 10.035 4.40276 10.035 5.5129C10.035 6.63824 9.375 7.3682 8.25 7.3682H6.435V3.68801Z" fill="#DFC352"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_846_157" x="0" y="0" width="15" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_846_157"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_846_157" result="shape"/>
                    </filter>
                    </defs>
                  </svg>
                </span>
                </div>
              </div>
              <div class="create__img">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M118.554 53.5929C118.162 53.1634 117.608 52.9164 117.026 52.9164H112.956C112.956 52.9164 98.8684 26.1138 98.14 24.7234C97.3587 23.2326 96.1763 21.9275 94.4079 21.9275C85.8014 21.9275 77.7698 20.0911 71.7927 16.7561C68.8105 15.0923 66.5619 13.1459 65.1881 11.1002V5.18821C65.1881 2.32276 62.8653 0 59.9999 0C57.1344 0 54.8117 2.32276 54.8117 5.18821V11.1002C53.4378 13.1459 51.1893 15.0923 48.2071 16.7561C42.2297 20.0908 34.1981 21.9275 25.5917 21.9275C23.8233 21.9275 22.7581 23.0121 21.8595 24.7234C19.7585 28.7245 7.04354 52.9164 7.04354 52.9164H2.97364C2.39205 52.9164 1.83717 53.1615 1.44546 53.5914C1.05375 54.0215 0.861782 54.5963 0.914961 55.1756C2.05481 67.551 12.4642 77.2419 25.1372 77.2419C37.8102 77.2419 48.2195 67.551 49.3594 55.1756C49.4126 54.5969 49.2196 54.0225 48.8281 53.5929C48.4367 53.1634 47.882 52.9164 47.3007 52.9164H43.2305L30.9373 29.4963C40.5153 28.7282 48.8758 25.9188 54.8119 21.7915V107.029H31.2966C27.7149 107.029 24.8113 109.933 24.8113 113.515C24.8113 117.096 27.7149 120 31.2966 120H87.7062C91.2879 120 94.1915 117.096 94.1915 113.515C94.1915 109.933 91.2879 107.029 87.7062 107.029H65.1884V21.7915C71.1245 25.9188 79.485 28.7284 89.0627 29.4963L76.7695 52.9164H72.6993C72.1177 52.9164 71.5629 53.1615 71.1712 53.5914C70.7794 54.0215 70.5875 54.5963 70.6409 55.1756C71.7805 67.551 82.1901 77.2419 94.8631 77.2419C107.536 77.2419 117.945 67.551 119.085 55.1756C119.139 54.5969 118.945 54.0228 118.554 53.5929ZM34.4412 52.9164H15.8329L25.1369 35.1909L34.4412 52.9164ZM85.5586 52.9164L94.8629 35.1906L104.167 52.9164H85.5586Z" fill="#151515" fill-opacity="0.15"/>
                </svg>

              </div>
            </div>
          </div>
          <div class="indicators">
            <div v-for="indicator in howManyIndicator" :class="['indicator', {active: currentStep === (indicator - 1)}]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <ModalVariablesCategoryWebinars v-show="isModal === 'variables-category-webinar'" @change="filterCategory" />
  </teleport>
</template>

<script>
import {useStore} from "vuex"
import {computed, onBeforeMount, ref} from "vue"
import ModalVariablesCategoryWebinars from "../modal/ModalVariablesCategoryWebinars"

export default {
  emits: ['render', 'select-webinar'],
  setup(props, { emit }) {
    const store = useStore()

    const currentWebinars = ref([])
    const currentWebinar = ref([])
    const currentStep = ref(0)
    const maxStep = ref(0)
    const startIndexForArray = ref(0)
    const endIndexForArray = ref(3)
    const isDisabledBack = ref(true)
    const isDisabledNext = ref(false)
    const filter = ref('')
    const webinars = ref([])
    const input = ref('')
    const createWeb = ref(null)
    const activeWeb = ref('all')

    onBeforeMount(async () => {
      await store.dispatch('webinar/getWebinars')
      webinars.value.push(...store.getters['webinar/getWebinars'])
    })

    // Getters
    const lessThanThree = computed(() => {
      if (filter.value) {
        return currentWebinars.value = store.getters['webinar/getWebinars'].filter(web => web.category === filter.value).length < 4
      } else {
        return currentWebinars.value = store.getters['webinar/getWebinars'].length < 4
      }
    })

    const activeWebComputed = computed(() => {
      return activeWeb.value
    })

    const getWebinarsDatalist = computed(() => {
      return store.getters['webinar/getWebinars']
    })


    const getWebinars = computed(() => {
      if (store.getters['webinar/getWebinars'].length === 0) {
        activeWeb.value = 'all'
        emit('render', 'all')
        emit('select-webinar', '')
      }
      if (currentWebinar.value.length !== 0) {
        currentWebinar.value.length = 0
      }
      if (store.getters['webinar/getIsCreate']) {
        currentStep.value = 0
        startIndexForArray.value = 0
        endIndexForArray.value = 3
        store.commit('webinar/setIsCreate', false)
      }
      let num
      if (filter.value) {
        let lengthArray = store.getters['webinar/getWebinars'].filter(web => web.category === filter.value).length
        currentWebinars.value = store.getters['webinar/getWebinars'].filter(web => web.category === filter.value).slice(startIndexForArray.value, endIndexForArray.value)
        num = lengthArray / 4
      } else {
        currentWebinars.value = store.getters['webinar/getWebinars'].slice(startIndexForArray.value, endIndexForArray.value)
        num = store.getters['webinar/getWebinars'].length / 4
      }
      if (num === 0) return maxStep.value = num
      if (num % 1 === 0) {
        maxStep.value = num + 1
      } else {
        maxStep.value = Math.ceil(num)
      }
      return currentWebinars.value
    })

    const isModal = computed(() => {
      return store.getters.getModal.name
    })

    const howManyIndicator = computed(() => {
      return maxStep.value
    })

    const getCurrentWebinar = computed(() => {
      return currentWebinar.value
    })

    // Methods
    const nextArrow = () => {
      if (maxStep.value > currentStep.value + 1) {
        currentStep.value++
        startIndexForArray.value = endIndexForArray.value
        endIndexForArray.value += 4
        if (filter.value) {
          currentWebinars.value = store.getters['webinar/getWebinars'].filter(web => web.category === filter.value).slice(startIndexForArray.value, endIndexForArray.value)
        } else {
          currentWebinars.value = store.getters['webinar/getWebinars'].slice(startIndexForArray.value, endIndexForArray.value)
        }
        isDisabledBack.value = false

        if (maxStep.value < currentStep.value + 2) isDisabledNext.value = true
      }
    }

    const backArrow = () => {
      if (currentStep.value > 0) {
        isDisabledNext.value = false
        if (currentStep.value === 1) {
          startIndexForArray.value = 0
        } else {
          startIndexForArray.value -=4
        }
        currentStep.value--
        endIndexForArray.value -= 4
        if (filter.value) {
          currentWebinars.value = store.getters['webinar/getWebinars'].filter(web => web.category === filter.value).slice(startIndexForArray.value, endIndexForArray.value)
        } else {
          currentWebinars.value = store.getters['webinar/getWebinars'].slice(startIndexForArray.value, endIndexForArray.value)
        }
        if (currentStep.value === 0) isDisabledBack.value = true
      }
    }


    const openModal = () => {
      store.commit('setModal', {
        open: true,
        name: 'variables-category-webinar'
      })
    }

    const searchElement = (e) => {
      currentWebinar.value.length = 0
      const el = store.getters['webinar/getWebinars'].find(web => web.title === input.value)
      if (!el) {
        currentWebinar.value.length = 0
        input.value = ''
        e.target.value = ''
        return
      }
      currentWebinar.value.push(el)
      currentStep.value = 0
      startIndexForArray.value = 0
      endIndexForArray.value = 3
      isDisabledNext.value = true
      isDisabledBack.value = true
      maxStep.value = 1
    }

    const filterCategory = (value) => {
      currentStep.value = 0
      startIndexForArray.value = 0
      endIndexForArray.value = 3
      if (value === 'all') return filter.value = ''
      filter.value = value
    }

    const selectWebinar = (e, dataset = '') => {
      if (e.target.dataset.id === 'add' || dataset === 'add') {
        activeWeb.value = 'all'
        emit('render', 'all')
        emit('select-webinar', '')
      } else {
        const el = store.getters['webinar/getWebinars'].find(web => web._id === e.target.dataset.id)
        activeWeb.value = el.title
        emit('select-webinar', {
          id: e.target.dataset.id,
          title: el.title
        })
        emit('render', el)
      }
    }

    return {
      activeWebComputed,
      input,
      searchElement,
      nextArrow,
      backArrow,
      currentStep,
      currentWebinars,
      howManyIndicator,
      isDisabledBack,
      isDisabledNext,
      openModal,
      isModal,
      filterCategory,
      getWebinars,
      lessThanThree,
      getWebinarsDatalist,
      currentWebinar,
      getCurrentWebinar,
      selectWebinar,
      createWeb
    }
  },
  components: {
    ModalVariablesCategoryWebinars,
  }
}
</script>
