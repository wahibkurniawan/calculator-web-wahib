//mengambil elemen dengan id maupun querySelector (lebih tepatnya meng-inisialisasi) untuk dijadikan variable const(tidak dapat dirubah nilainya), .
const history = document.getElementById("tampilan2");
const display = document.getElementById("tampilan1");
const buttons = document.querySelectorAll(".btn");
const pangkat = document.getElementById("pangkat");

//declarasi variabel yg akan sering dipakai dan dapat dirubah nilainya (variabel let).
let lastClickedButton = null; //mengidentifikasi tombol terakhir yang diklik.
let isProcessing = false; //operasi matematik yg sedang berjalan.
let resetTampilan = false; //untuk mereset tampil hasil disaat tertentu(ex: saat menerima input setelah samadengan).
let expression = ""; //input sementara, dimana ekspresi matematika dalam bentuk string.
let displayValue = ""; //variable untuk menampilkan hasil di layar utama.

//membuat function untuk membatasi digit dilayar display, max 16 digit,
function limitDisplayDigits(value) {
  if (value.length > 16) {
    //apakah value lebih panjang dari 16? jika iya lanjutkan perintah dibawahnya...
    return value.slice(0, 16); // return mengembalikan value yang akan dipotong antara digit 0-16.
  }
  return value; //jika tidak, mengembalikan value yang ada, dibawah 16 digit.
}

//membuat function untuk mencegah digit pertama berupa operator.
function lastCharOperator() {
  //memeriksa apakah input terkhir yang dimasukan tersebut adalah operator atau number.
  const lastChar = expression.slice(-1); // membuat variabel untuk mengembalikan input terakhir, (slice(-1) adalah mengambil angka terakhir diinput, yang artinya input paling kanan dilayar display).
  return ["+", "*", "/", "."].includes(lastChar); //includes() untuk memeriksa apakah dalam variable lastChar(angka terakhir) mengandung nilai dalam array, jika iya maka bernilai "true". jika tidak bernilai "false".
}
function minus() {
  // mengoptimalkan kondisi minus
  if (expression.slice(-1) === "-") {// jika tanda minus terakhir diikuti oleh minus lagi, ubah menjadi plus
    expression = expression.slice(0, -1) + "+";
  } else if (displayValue === "" || displayValue === "0") {// jika layar display bernilai kosong atau 0, tambahkan minus di awal
    displayValue = "-"; //display menampilkan minus "-".
    expression = "-"; //expression menampilkan minus "-".
  } else { //jika tidak memenuhi kondisi diatas, maka =>
    expression += "-"; //setiap input minus, tambahkan minus di expreession
  }
  display.textContent = displayValue; //menampilkan input di display dari dispalyValue menggunakan textcontent.
  history.textContent = expression; //menampilkan input di histroy dari expressi menggunakan textcontent.
}

function titikInput() {
  // mengoptimalkan pengkondisian input titik
  if (displayValue === "" || displayValue === "0") {
    //jika layar 0 dan kosong maka menambah input "0." di expresi dan displayValue saat ditekan titik.
    displayValue = "0."; //menampikan 0. di expresi dan displayValue saat ditekan titik.
    expression = "0.";
  } else if (expression === "-" && displayValue === "-") {
    //jika layar - dan ekspresi - maka menambah input "-0." di expresi dan displayValue saat ditekan titik.
    displayValue = "-0."; //menampikan -0. di expresi dan displayValue saat ditekan titik.
    expression = "-0.";
  } else if (expression === "-0") {
    //jika di ekspresi -0 maka menambah input "-0." di expresi dan displayValue saat ditekan titik.
    displayValue = "-0."; //menampikan -0. di expresi dan displayValue saat ditekan titik.
    expression = "-0.";
  } else if (!isProcessing && expression !== "") {
    //jika sedang dalam proses input, dan di ekspresi tidak kosong maka menambah input "." di expresi dan displayValue saat ditekan titik.
    displayValue += "."; //menambah . di expresi dan displayValue saat ditekan titik.
    expression += ".";
  } else {
    displayValue += "."; // selain kondisi diatas menambah . di expresi dan displayValue saat ditekan titik.
    expression += ".";
  }
  display.textContent = displayValue; //menampilkan input di display dari dispalyValue menggunakan textcontent.
  history.textContent = expression; //menampilkan input di histroy dari expressi menggunakan textcontent.
}
function enoll() {
  if (displayValue === "-0" || displayValue === "-") {
    // jika layar bernilai identik dengan -0, maka =>
    displayValue = "-0."; //layar utama menampilkan = -0.
    expression = "-0."; //layar history = -0.
  } else if (displayValue === "0") {
    //jika layar bernilai identik dengan 0, maka =>
    displayValue += "."; //layar utama menampilkan = .
    expression += "."; //layar history = .
  } else if (!isProcessing && expression !== "") {
    //jika sedang proses dan layar expresi tidak samadengan kosong, maka =>
    displayValue += "0."; //layar utama menampilkan = 0.
    expression += "0."; //layar history = 0.
  } else {
    // jika kondisi diatas tidak terpenuhi, maka =>
    displayValue += "0"; //layar utama menampilkan = 0
    expression += "0"; //layar history = 0.
  }
  display.textContent = displayValue; //menampilkan input di display dari dispalyValue menggunakan textcontent.
  history.textContent = expression; //menampilkan input di histroy dari expressi menggunakan textcontent.
}
//kondisi percabangan dalam percabangan
function updateDisplay(value) {
  //untuk memperbarui tampilan saat pengguna menekan tombol dengan nilai operator atau number.
  if (resetTampilan) {
    //jika saat nilai variabel resetTampilan true, maka => ,
    displayValue = value; //display menampilkan nilai baru.
    expression = value; //expression jg nilai baru.
    resetTampilan = false; //dirubah jadi nilai false kembali, untuk menandakan sudah direset dan siap menerima input baru.
  } else {
    //jika kondisi diatas tidak terpenuhi maka =>
    if (["/", "*", "+"].includes(value)) {
      //*include berfungsi untuk memberi tahu apa nilai value ada di dalam array, kondisi: includes(nilai, urutan array) atau include(nilai)
      //jika value termasuk dalam array => maka =>
      if (
        expression === "" && //jika expresi kosong atau ga ada valuenya, dan apabila =>
        (value === "/" || value === "*" || value === "+") // jika nilai sama identik dengan / atau * atau + , maka=>
      ) {
        return; // jika bernialai true, maka menghentikan proses, tujuannya=> mencegah input /, *, atau + sebagai karakter pertama.
      }
      if (lastCharOperator()) {
        //jika nilainya adalah adalah operator, maka=>
        return; // jika value adalah kondisi seperti lastCharOperator, hentikan prosesnya, tujuan untuk=> mencegah input operator ganda atau input operator secara berurutan.
      }
      expression += value; // jika dalam kondisi diatas lolos, maka=> menambahkan value ke ekspresi, tetapi tidak ke tampilan.
    } else {
      // jika masuk kondisi yang diatas maka =>
      displayValue += value; //menambah nilai ke tampilan utama.
      displayValue = limitDisplayDigits(displayValue); //dibatasi 16 digit.
      expression += value; // menambah nilai ke expresi
      display.textContent = displayValue; // menampilkan nilai ke display dengan textContent dari displayValue.
    }
  }
  history.textContent = expression; // menampilkan ekspresi di riwayat tampilan (history) dan diperbarui untuk mengetahui perhitungan yang sedang terjadi.
  try {
    const result = eval(expression); //membuat variable result, untuk menghitung nilai dari input, diambil dr variable expression.
    display.textContent = limitDisplayDigits(result.toString()); //mengubah hasil(result) ke dalam display dengan textContent, yang mana dibatasi dulu panjang digitnya(16) dengan merubah ke string.
  } catch {
    //jika terjadi kesalahan di uji coba(try) diatas, maka akan dilakukan penanggulangannya diproses (catch) ini =>
    //namun karna tidak mungkin ada kesalahan maka proses ini diabaikan, makanya dikosongin bagian catch.
  }
}

//bagian tombol, agak banyak karena ada 9 operasi matematik dan 10 number input~
buttons.forEach((button) => {
  //NB: memberikan event untuk setiap tombol ketika di tekan.
  button.addEventListener("click", function () {
    if (isProcessing) return; //jika sedang prosess input (isProssesing bernilai true),maka=> menghentikan proses dengan return, supaya tidak ada Double Click
    if (lastClickedButton === this) {
      //memeriksa tombol yang terakhir diklik (lastClickedButton) apakah tombol yang sama dengan yang saat ini diklik ("this" mengacu pada tombol yang sedang diklik).
      lastClickedButton = null; //jika iya, berarti tombol yang diklik sama, yang terinput kemungkinan tertekan dua kali, sehingga tombol terakhir yang diklik (lastClickedButton) direset ke null, dan fungsi keluar tanpa melakukan apa pun lagi.
      return;
    }
    lastClickedButton = this; //Jika tidak maka tombol yang diklik tidak sama dengan tombol sebelumnya, maka tombol yang diklik sekarang (this) disimpan ke dalam lastClickedButton untuk pengecekan di langkah sebelumnya pada klik berikutnya.

    isProcessing = true; //proses bernilai true, maka melanjutkan proses.
    setTimeout(() => {
      isProcessing = false;
    }, 100); // menghentikan waktu sejenak waktu saat input, 100mili detik atau 0.1 detik.

    const value = this.getAttribute("data-value"); // membuat variabel untuk mengambil nilai dari attribut "data-value" di dalam index.html .
    if (this.id === "samadengan") {
      // jika yang diklick memiliki id "samadengan"
      //NB: membuat tombol yang berfungsi sebagai calcalate  atau perhitungan.
      try {
        // menampilkan hasil
        const result = eval(expression); //mencalculate nilai dalam expressi
        display.textContent = limitDisplayDigits(result.toString()); //menjaga tetap 16digit.
        history.textContent = expression + " = " + result; //hasil di setting sedemikian rupa di history.
        expression = result.toString(); // expresi merupakan hasil yang dibuat string.
        displayValue = result.toString(); // display merupkan hasil yang dibuat string.
        resetTampilan = true; //reset tampilan
      } catch {
        display.textContent = "Error"; // notif layar utama saat dieksekusi karena input tidak lengkap.
        history.textContent = "Tolong Input dengan BENAR"; //notif layar history saat dieksekusi karena input tidak lengkap.
        expression = ""; //hasil expression kosong.
        displayValue = ""; // hasil di displayValue kosong.
        resetTampilan = true; //reset tampilan.
      }
    } else if (this.id === "clear") {
      // jika yang diklick memiliki id "clear"
      // NB: membuat tombol yang berfungsi membersihkan layar, atau membuat layar bernilai "(kosong)".
      display.textContent = "0"; //hasil di "display" merupkan string kosong.
      history.textContent = ""; // hasil di "history" merupkan string kosong.
      expression = ""; //hasil expression kosong.
      displayValue = ""; // hasil di displayValue kosong.
      resetTampilan = false; //reset tampilan FALSE.
    } else if (this.id === "pangkat") {
      // jika yang diklick memiliki id "pangkat" ,maka =>
      // NB: tombol kuadrat (²), mengkuadratkan / pangkat 2 semua yang ada dilayar .
      const currentNumber = parseFloat(display.textContent);
      if (!isNaN(currentNumber)) {
        //Kondisi ini memeriksa apakah currentNumber adalah angka yang valid, bukan NaN "Not-a-Number". Ini penting untuk memastikan operasi matematika dilakukan pada angka yang valid., JIKA nilai valid maka melanjukan blok if.
        const squaredValue = Math.pow(currentNumber, 2); // Math.pow digunakan untuk memangkatan ,Math.pow(variablenya ,nilai pangkatnya).
        //NB: squaredValue adalah variabel yang menyimpan hasil perhitungan pangkat dua dari currentNumber.
        display.textContent = limitDisplayDigits(squaredValue.toString()); //menampikan hasil yang udah dilimit 16digit.
        history.textContent = `${currentNumber}² = ${squaredValue}`; //menampilkan dihistory dengan sedemikian rupa.
        expression = squaredValue.toString(); //expresion adalah hasil dari perhitungan pangkat yang di buat string.
        displayValue = squaredValue.toString(); //displayValue adalah hasil dari perhitungan pangkat yang dibuat string.
        resetTampilan = true; //reset tampilan.
      } else {
        //JIKA tidak valid , maka =>
        expression = ""; // di expresi dan displayValue saat ditekan pangkat tidak ada input.
        displayValue = "";
        resetTampilan = true; //reset tampilan.
      }
    } else if (this.id === "del") {
      // jika yang diklick memiliki id "del"
      //NB : tombol delete, mengurangi satu digit dari kanan.
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1); //slice(angka awal,angka akhir).
        expression = expression.slice(0, -1); //memotong expresi dari 0 ke -1
        display.textContent = displayValue; //display diambil dari displayValue dengan textContent
      } else {
        display.textContent = "0"; // mengatur ulang ke "0" jika panjang kurang dari 1.
        displayValue = ""; // di expresi dan displayValue saat ditekan del/AC tidak ada input.
        expression = "";
      }
      history.textContent = expression; //history diambil dari expression dengan textContent.
    } else if (this.id === "titik") {
      //// jika yang diklick memiliki id "titik" function titikInput akan aktif.
      titikInput();
    } else if (this.id === "minus") {
      //// jika yang diklick memiliki id "minus" function minus akan aktif.
      minus();
    } else if (this.id === "nol") {
      //// jika yang diklick memiliki id ""nol, function enoll akan aktif.
      enoll();
    } else {
      //setelah hasil, diberi input number akan reset, jika operasi matematik akan dilanjutkan.
      if (resetTampilan) {
        //jika reset tampilan bernilai true, maka =>
        if (["/", "*", "+", "-", "."].includes(value)) {
          // jika value masuk dalam salah satu nilai dalam index array,  maka =>
          expression += value; // expresi bernilai value.
          resetTampilan = false; // resettampilan dioffkan lagi.
        } else {
          // dan jika tidak maka =>
          displayValue = value; //menampikan nilai ke display.
          expression = value; // menampilkan nilai ke expression.
          resetTampilan = false; // resetTampilan di offkan lagi.
        }
        display.textContent = displayValue; //display diambil dari displayvalue dengan textContent.
      } else {
        //selain itu, maka =>
        updateDisplay(value); //update tampilan display.
      }
    }
  });
});