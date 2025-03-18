$(function () {
  var options = {
    onkeyup:false,
    rules: {
      //検証ルールの定義
      company_name: {
        required: true,
      },
      user_name: {
        required: true,
      },
      zipcode:{
        half_num: true,
        fix_half_num: true,
      },
      tel: {
        required: true,
        number: true,
        rangelength: [10, 11],
      },
      email: {
        required: true,
        email: true,
      },
      agree: {
        required: true,
      },
    },



    messages: {
      //入力項目ごとのエラーメッセージ定義
      company_name: {
        required: "会社名を入力してください",
      },
      user_name: {
        required: "お名前を入力してください",
      },
      tel: {
        required: "電話番号を入力してください",
        number: "電話番号は半角数字で入力してください",
        rangelength: "携帯電話番号の桁数が正しくありません",
      },
      email: {
        required: "メールアドレスを入力してください",
        email: "メールアドレスの形式が正しくありません",
        remote: "形式が異なるか、現在使われていないメールアドレスです",
      },
      agree: {
        required: "個人情報の取り扱いに同意されていません",
      },
    },
    errorPlacement: function (error, element) {
      var name = element.attr("name");
      name = name.replace("[]", "");
      $("#" + name + "_error").html(error);
      $('input[type="text"][name="' + name + '"]').addClass("formItem--error");
      $('select[name="' + name + '"]').addClass("formItem--error");
      $('input[type="checkbox"][name="' + name + '"]')
        .parents("label")
        .addClass("formItem--error");
      $('input[type="radio"][name="' + name + '"]')
        .parents("label")
        .addClass("formItem--error");
    },
    success: function (error, element) {
      var name = $(element).attr("name");
      name = name.replace("[]", "");
      $("#" + name + "-error").hide();
      $(error).remove();
      $('input[type="text"][name="' + name + '"]').removeClass(
        "formItem--error"
      );
      $('select[name="' + name + '"]').removeClass("formItem--error");
      $('input[type="radio"][name="' + name + '"]')
        .parents("label")
        .removeClass("formItem--error");
      $('input[type="checkbox"][name="' + name + '"]')
        .parents("label")
        .removeClass("formItem--error");
    },
  };
  var result = "true";


  //スペースの半角を全角に変換
  jQuery.validator.addMethod(
    "convert_space_fullwidth",
    function (value, element) {
      return (
       $(element).val( value.replace(/\s/g, '　') )
      );
    }
  );

  //ハイフンを半角→全角へ変換
  jQuery.validator.addMethod(
    "convert_hyphen_fullwidth",
    function (value, element) {
      return (
        $(element).val( value.replace(/-/g, '‐') )
      );
    }
  );

  jQuery.validator.addMethod(
    "katakana",
    function (value, element) {
      return this.optional(element) || /^([^ｧ-ﾝﾞﾟ][^ぁ-んー])+$/.test(value);
    },
    "全角カタカナを入力してください"
  );

  jQuery.validator.addMethod(
    "moji",
    function (value, element) {
      return this.optional(element) || /^[ぁ-んーァ-ンヴーｧ-ﾝﾞﾟ\-]*$/.test(value);
    },
    "カタカナを入力してください"
  );

  jQuery.validator.addMethod(
    "kana_space",
    function (value, element) {
      return this.optional(element) || /^([ァ-ヶー\s]+)$/.test(value);
    },
    "カタカナを入力してください"
  );

  jQuery.validator.addMethod(
    "zero_lead",
    function (value, element) {
      return this.optional(element) || /^0/.test(value);
    },
    "0から始まる10から11桁の電話番号を入力してください"
  );

  jQuery.validator.addMethod(
    "zero_lead2",
    function (value, element) {
      return this.optional(element) || /^0/.test(value);
    },
    "0から始まる22桁の数字で入力してください"
  );

  jQuery.validator.addMethod(
    "zero_lead3",
    function (value, element) {
      return this.optional(element) || /^0/.test(value);
    },
    "0から始まる数字で入力してください"
  );


  jQuery.validator.addMethod(
    "tel_rule",
    function (value, element) {
      return this.optional(element) || /^0[6789]0/.test(value);
    },
    "0から始まる3桁の番号を入力してください"
  );

  jQuery.validator.addMethod(
    "keitai_no",
    function (value, element) {
      return this.optional(element) || /^0[6789]0[0-9]{4}[0-9]{4}/.test(value);
    },
    "携帯電話番号の形式が間違っています"
  );


  $(".js_caf_select").change(function () {
    $("#discount_hikari_c_no_error label").remove();
    $("input[name='discount_hikari_c_no']").removeClass('error', 'formItem--error');
    var select = $("option:selected", this).val();
    if (select == "CAF") {      
      jQuery.validator.addMethod(
        "caf_no",
        function (value, element) {
          return (
            this.optional(element) || /^(?=.*1|5)(^.{10}$)/.test(value)
          );
        },
        "1または5から始まる10桁の数字でご入力してください"
      );
    } else if (select == "COP") {
      jQuery.validator.addMethod(
        "caf_no",
        function (value, element) {
          return (
            this.optional(element) || /^(?=.*0|1)(^.{8}$)/.test(value)
          );
        },
        "0または1から始まる8桁の数字でご入力してください"
      );
    }
  });

  jQuery.validator.addMethod(
    "half_num",
    function (value, element) {
      return this.optional(element) || /^([0-9０-９]+)$/.test(value);
    },
    "半角数字のみを入力してください"
  );

  //半角数字へ変換
  jQuery.validator.addMethod(
    "fix_half_num",
    function (value, element) {
      return this.optional(element) || /^([0-9]+)$/.test(value);
    },function(value, element){
      
      var str = element.value
      var half_num = str.replace(/[！-～]/g, function (tmpStr) {
        return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0);
      });
      element.value = half_num;
    }
  );

  //半角英数以外をエラー
  jQuery.validator.addMethod(
    "half_alphabet",
    function (value, element) {
      return this.optional(element) || /^([a-zA-Z0-9]+)$/.test(value);
    },
    "半角英数のみを入力してください"
  );



  $('select[name="serv_keiyaku_type"]').change(function () {
    if ($(this).find('option:selected').val() !== "1 オフィスでんき119バリュープランA") {
      $('input[name="serv_capacity"]').rules("add", {
        required: true,
        capacity_val: true
      });
    
      jQuery.validator.addMethod(
        "capacity_val",
        function (value, element) {
          return (
            this.optional(element) || /^([0-9]+)$/.test(value)
          );
        },
        '半角数字のみを入力してください'
      );
    }else {
      $('input[name="serv_capacity"]').rules("add", {
        required: false,
        capacity_val: false
      });
    }

  });


  $(".f-quantity select").on("change", function () {
    
    quantity1 = $('.home_quantity').val();
    quantity2 = $('.mobile_quantity').val();
    quantityList = quantity1 + quantity2;
    console.log(quantity1);
    if (!quantityList) {
      $("select[name='quantity[]']").rules("add", {
        required: true,
      });
    }else {
      $("select[name='quantity[]']").rules("add", {
        required: false,
      });
    }

  });

  // $(window).on('load', function(){
  //   if(typeof ssData !== "undefined"){
  //     sorting(ssData.serv_keiyaku_type);
  //   }
  // });

  $('select[name="serv_area"]').change(function(){
    var area = $('select[name="serv_area"]').val();
  });





  //基本的な変換指定
  var convert = {
    'half_to_full_alphabet': function(elm){
      var fullVal = elm.val().replace(/[A-Za-z]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
      fullVal = fullVal.replace(/-/g, '‐');
      fullVal = fullVal.replace(/_/g, '＿');
      elm.val(fullVal);

    },
    'full_to_half_alphabet': function(elm){
      var halfVal = elm.val().replace(/[Ａ-Ｚａ-ｚ]/g, function(s){
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
      halfVal = halfVal.replace(/‐/g, '-');
      elm.val(halfVal);
    },
    'half_to_full_num': function(elm){
      var fullVal = elm.val().replace(/[0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
      });
      elm.val(fullVal);

    },
    'full_to_half_num': function(elm){
      var halfVal = elm.val().replace(/[０-９]/g, function(s){
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
      elm.val(halfVal);
    },
    'half_to_fullwidth_space': function(elm){
      var fullVal = elm.val().replace(/\s/g, '　');
      elm.val(fullVal);
    },
    'space_to_null': function(elm){
      elm.val(elm.val().replace(/\s/g, ''));
    },
    'alphabet_to_null': function(elm){
      elm.val(elm.val().replace(/[a-zA-ZＡ-Ｚａ-ｚ]/g, ''));
    },
    'num_to_null': function(elm){
      elm.val(elm.val().replace(/[0-9０-９]/g, ''));
    },
    'kigou_to_null': function(elm){
      elm.val(elm.val().replace(/[!"#$%&'()*+-.･,\/:;<=>?@[\]^_`「」{|}~]/g, ''));
    },
    'hiragana_to_null': function(elm){
      elm.val(elm.val().replace(/[ぁ-ん]/g, ''));
    },
    'kanji_to_null': function(elm){
      elm.val(elm.val().replace(/[一-龠]/g, ''));
    },
    'half_num_only': function(elm){
      elm.val(elm.val().replace(/[^0-9]/g, ''));
    },
    'hyphen_to_fullwidth': function(elm){
      elm.val(elm.val().replace(/-/g, '-'));
    },
    'kigou_to_halfsize': function(elm){

      // 文字コードをシフト
      var halfVal = elm.val().replace(/[（）－]/g, function( tmpStr ) {
        return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
      });

      //シフト非対応文字変換
      halfVal = halfVal.replace(/”/g, "\"")
        .replace(/’/g, "'")
        .replace(/‘/g, "`")
        .replace(/￥/g, "\\")
        .replace(/　/g, " ")
        .replace(/〜/g, "~")
        .replace(/（/g, "(")
        .replace(/）/g, ")")
        .replace(/！/g, "!")
        .replace(/‐/g, "-")
        .replace(/＿/g, "_");

      function zenkana(str) {
        var kanaMap = {"・": "･"}
        var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
        return str.replace(reg, function (match) {
                  return kanaMap[match];
                });
      };
      halfVal = zenkana(halfVal);
      elm.val(halfVal);
    },
    'kigou_to_fullwidth': function(elm){

      // 文字コードをシフト
      var fullVal = elm.val().replace(/[（）－]/g, function( tmpStr ) {
        return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
      });

      //シフト非対応文字変換
      fullVal = fullVal.replace(/”/g, "\"")
        .replace(/'/g, "’")
        .replace(/`/g, "‘")
        .replace(/￥/g, "\\")
        .replace(/ /g, "　")
        .replace(/~/g, "〜")
        .replace(/\(/g, "（")
        .replace(/\)/g, "）")
        .replace(/!/g, "！")
        .replace(/-/g, "‐")
        .replace(/_/g, "＿");

        
      function zenkana(str) {
        var kanaMap = {"･": "・"}
        var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
        return str.replace(reg, function (match) {
                  return kanaMap[match];
                });
        
      };
      fullVal = zenkana(fullVal);
      elm.val(fullVal);
    },
    'katakana_to_fullwidth': function(elm){
      function zenkana(str) {
        var kanaMap = {
          'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
          'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
          'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
          'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
          'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
          'ｳﾞ': 'ヴ', 'ﾜﾞ': '?', 'ｦﾞ': '?',
          'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
          'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
          'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
          'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
          'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
          'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
          'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
          'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
          'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
          'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
          'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
          'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
          '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
        }
        var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
        return str.replace(reg, function (match) {
          return kanaMap[match];
        }).replace(/゛/g, 'ﾞ').replace(/゜/g, 'ﾟ');
        
      };
      elm.val(zenkana(elm.val()));
      },
      'katakana_to_halfsize': function(elm){
        function zenkana(str) {
          var kanaMap = {
            "ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
            "ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
            "ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
            "バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
            "パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
            "ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
            "ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
            "カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
            "サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
            "タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
            "ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
            "ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
            "マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
            "ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
            "ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
            "ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
            "ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
            "ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
            "。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
          }    
          var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
          return str.replace(reg, function (match) {
            return kanaMap[match];
          }).replace(/゛/g, 'ﾞ').replace(/゜/g, 'ﾟ');
          
        };
        elm.val(zenkana(elm.val()));
        },
  
  }




  //処理対象セレクタ
  var selectors = {
    'contrMeigi': [
      'input[name="contr_meigi"]'
    ],
    'telno': [
      'input[name="telno"]'
    ],
    'postalCode': [
      'input[name="postal_code"]'
    ],
    'kana': [
      'input[name="company_kana"]',
      'input[name="contcractor_kana"]',
      'input[name="manager_kana"]',
      'input[name="store_name_kana"]'
    ],
    'contrMeigiKana': [
      'input[name="contr_meigi_kana"]'
    ],
    'contrApplicantName': [
      'input[name="contr_applicant_name"]',
      'input[name="contr_applicant_name_kana"]'
    ],
    'contrAddr': [
      'input[name="contr_addr_city"]',
      'input[name="contr_addr_town"]',
      'input[name="contr_addr_chome"]',
      'input[name="contr_addr_address"]',
      'input[name="contr_addr_building"]',
      'input[name="contr_addr_room"]',
    ],
    'contrCompany': [
      'input[name="contr_company"]',
    ],
    'contrCompanyKana': [
      'input[name="contr_company_kana"]',
    ],
    'contcractorKana': [
      'input[name="contcractor_kana"]',
    ],
    'contrRep': [
      'input[name="contr_rep"]'
    ],
    'contrRepKana': [
      'input[name="contr_rep_kana"]'
    ],
    'contrRepDirector': [
      'input[name="contr_rep_director"]'
    ],
    'contrRepDirectorKana': [
      'input[name="contr_rep_director_kana"]'
    ],
    'opRescueAddrTel': [
      'input[name="op_rescue_tel"]',
      'input[name="op_rescue_mobile_tel"]',
    ],
    'opRescueAddrZipcode': [
      'input[name="op_rescue_addr_zipcode"]',
    ],
    'opRescueName': [
      'input[name="op_rescue_name"]',
    ],
    'opRescueNameKana': [
      'input[name="op_rescue_name_kana"]',
    ],
    'opRescueAddr': [
      'input[name="op_rescue_addr_city"]',
      'input[name="op_rescue_addr_town"]',
      'input[name="op_rescue_addr_chome"]',
      'input[name="op_rescue_addr_address"]',
      'input[name="op_rescue_addr_building"]',
      'input[name="op_rescue_addr_room"]',
    ],
    'contrApplicantName': [
      'input[name="contr_applicant_name"]',
    ],
    'contrApplicantNameKana': [
      'input[name="contr_applicant_name_kana"]',
    ],
  };
  


  //項目別の処理指定
  //[契約名義->名義]
  $(selectors.contrMeigi.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'kigou_to_fullwidth',
      'half_to_full_num',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

  //[契約名義->名義カナ]
  $(selectors.contrMeigiKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

  //住所郡の英数記号を全角、カナを全角
  $(selectors.contrAddr.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'kigou_to_fullwidth',
      'half_to_full_num',
      'half_to_fullwidth_space',
    ];

    //エリア別の記号変換
    if($(this).attr('name') == 'contr_addr_address'){
      if(typeof area !== "undefined"){
        if(area == '3 東京'){
          $(this).val($(this).val().replace(/[\‐\-\ー\₋]/g, '―'));
        }else{
          $(this).val($(this).val().replace(/[\‐\ー\₋]/g, '-'));
        }
      }
    }
    convProc(apply, $(this));
  });

  //[代表者->氏名]
  $(selectors.contrRep.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'kigou_to_halfsize',
      'kigou_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

  //[代表者->氏名カナ]
  $(selectors.contrRepKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

  //[代表者->役職名]
  $(selectors.contrRepDirector.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'space_to_null',
      'num_to_null',
      'kigou_to_halfsize',
      'kigou_to_null',
    ];
    convProc(apply, $(this));
  });

  //[代表者->役職名カナ]
  $(selectors.contrRepDirectorKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
    ];
    convProc(apply, $(this));
  });

  //[顧客情報->会社名]
  $(selectors.contrCompany.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'kigou_to_fullwidth',
      'half_to_full_num',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

  //[顧客情報->会社名カナ]
  $(selectors.contrCompanyKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space',      
    ];
    convProc(apply, $(this));
  });

  //[申し込み者について->申し込み者名]
  $(selectors.contrApplicantName.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'half_to_full_alphabet',
      'kigou_to_halfsize',
      'kigou_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space',
    ];
    convProc(apply, $(this));
  });

//契約電話番号
  $(selectors.telno.join()).change(function () {
    const apply = [
      'half_num_only',
    ];
    convProc(apply, $(this));
  });
  //郵便番号
  $(selectors.postalCode.join()).change(function () {
    const apply = [
      'half_num_only',
    ];
    convProc(apply, $(this));
  });
  //カタカナ
  $(selectors.kana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space', 
    ];
    convProc(apply, $(this));
  });

  $(selectors.contcractorKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
      'half_to_fullwidth_space', 
    ];
    convProc(apply, $(this));
  });

  //[申し込み者について->申し込み者名カナ]
  $(selectors.contrApplicantNameKana.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',      
    ];
    convProc(apply, $(this));
  });

  //[かけつけレスキュー->契約者氏名]
  $(selectors.opRescueName.join()).change(function () {
    const apply = [
      'full_to_half_alphabet',
      'space_to_null',
    ];
    convProc(apply, $(this));
  });

  //[かけつけレスキュー->契約者氏名カナ]
  $(selectors.opRescueNameKana.join()).change(function () {
    const apply = [
      'katakana_to_halfsize',
      'kigou_to_halfsize',
      'kigou_to_null',
      'hiragana_to_null',
      'kanji_to_null',
      'alphabet_to_null',
      'num_to_null',
      'space_to_null',
    ];
    convProc(apply, $(this));
  });

  //[かけつけレスキュー->電話番号]
  $(selectors.opRescueAddrTel.join()).change(function () {
    const apply = [
      'full_to_half_num',
      'half_num_only',
    ];
    convProc(apply, $(this));
  });

  //[かけつけレスキュー->郵便番号]
  $(selectors.opRescueAddrZipcode.join()).change(function () {
    const apply = [
      'full_to_half_num',
      'half_num_only',
    ];
    convProc(apply, $(this));
  });

  //[かけつけレスキュー->訪問先住所（市区郡以降）]
  $(selectors.opRescueAddr.join()).change(function () {
    const apply = [
      'katakana_to_fullwidth',
      'kigou_to_halfsize',
      'full_to_half_alphabet',
      'full_to_half_num',
      'kigou_to_fullwidth',
    ];

    //エリア別の記号変換
    if($(this).attr('name') == 'op_rescue_addr_address'){
      if(typeof area !== "undefined"){
        if(area == '3 東京'){
          $(this).val($(this).val().replace(/[\‐\-\ー\₋]/g, '―'));
        }else{
          $(this).val($(this).val().replace(/[\‐\ー\₋]/g, '-'));
        }
      }
    }
    convProc(apply, $(this));
  });

  



  var convProc = function(arr, thisElm){
    for (const elm of arr) {
      convert[elm](thisElm);
    }
  }




  //実行
  $("#form1").validate(options);


});

