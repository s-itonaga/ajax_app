// memoという関数を定義。
function memo() {
  // 投稿するボタンの情報を取得して、定義
  const submit = document.getElementById("submit");
  // 投稿ボタンをclick(クリック)した時に発動するeという関数を定義
  submit.addEventListener("click", (e) => {
    // 新しく(id=formで)投稿された(フォームに入力された)情報を変数formDataを定義する
    const formData = new FormData(document.getElementById("form"));
    // Ajaxを可能にするためのHttpリクエストの情報を変数XHRに定義する
    const XHR = new XMLHttpRequest();
    // XHRのリクエスト内容を設定（HTTPメソッドはPOST、パスは/posts,非同期通信はtrue）して、XMLHttpRequestに代入。
    XHR.open("POST", "/posts", true);
    // リクエストの内容をjson型で取得
    XHR.responseType = "json";
    // 上で定義しているformDataをXHRへ送信(send)する
    XHR.send(formData);

    // レスポンスの受診が成功した際に実行する関数を定義   
   XHR.onload = () => {
     if (XHR.status != 200) {
    // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
       alert(`Error ${XHR.status}: ${XHR.statusText}`);
      // 処理を終了している
       return null;
     }
      // 上のレスポンスで帰ってきた投稿のレコードデータをitemに代入
      const item = XHR.response.post;
      // 実際にHTMLを表示する場所を指定するために親要素のlistを取得
      const list = document.getElementById("list");
      // 投稿フォームの内容をリセットするため、リセット対象の要素contentを取得
      const formText = document.getElementById("content");

      const HTML = `
       <div class="post" data-id=${item.id}>
         <div class="post-date">
           投稿日時：${item.created_at}
         </div>
         <div class="post-content">
         ${item.content}
         </div>
       </div>`;
     list.insertAdjacentHTML("afterend", HTML);
     formText.value = "";
   };
   e.preventDefault();
 });
}
// window(ページ)をload(読み込んだ)時に、memoの関数が発火
window.addEventListener("load", memo);