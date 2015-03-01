var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Symbols_png:"res/symbols.png",
    Symbols_plist:"res/symbols.plist",
    LayerUI_png:"res/UI.png", 
    LayerUI_free_png:"res/freespinUI.png",
    ExitNormal_png:"res/exitnormal.png",
    ExitSelected_png:"res/exitselected.png",
    ExitDisable_png:"res/exitdisable.png",
    HelpNormal_png:"res/helpnormal.png",
    HelpSelected_png:"res/helpselected.png",
    HelpDisable_png:"res/helpdisable.png",
    BuyNormal_png:"res/buynormal.png",
    BuySelected_png:"res/buyselected.png",
    BuyDisable_png:"res/buydisable.png",
    RevealNormal_png : "res/reveal_off.png",
    RevealSelected_png : "res/reveal_on.png",
    RevealDisabled_png:"res/reveal_disabled.png",

    RevealLiteNormal_png:"res/revealbtn.png",
    RevealLiteDisabled_png:"res/revealbtn_disabled.png",
    AutoOn:"res/auto_on.png",
    AutoOff:"res/auto_off.png",
    BombOn:"res/bombbtn_no.png",
    BombOff:"res/bombbtn_off.png",
    GameBackground_png:"res/background.png",

    Door_png:"res/door.png",
    Door_plist:"res/door.plist",
    WolfMan_png:"res/wolfman.png",
    WolfMan_plist:"res/wolfman.plist",
    Kuang_png:"res/kuang.png",
    Kuang_plist:"res/kuang.plist",
    Special_png:"res/special.png",
    Special_plist:"res/special.plist",
    Bigwin_png:"res/bigwin.png",
    Bigwin_plist:"res/bigwin.plist",

    /*freespin*/
    Freespin_png:"res/freespin.png",
    Freespin_plist:"res/freespin.plist",
    Freespin_end_box:"res/freetotalwin.png",

    /*HelpUIresource*/
    HelperUI_png:"res/helperUI.png",
    ResumeNormal_png:"res/resumebtnNormal.png",
    ResumeSelected_png:"res/resumebtnSelected.png",
    BackNormal_png:"res/backNormal.png",
    BackSelected_png:"res/backSelected.png",
    nextNormal_png:"res/nextNormal.png",
    nextSelected_png:"res/nextSelected.png",
    /*HelpContent*/
    HelpCont_01_png:"res/helper/hcont_f01.jpg",
    HelpCont_02_png:"res/helper/hcont_f02.jpg",
    HelpCont_03_png:"res/helper/hcont_f03.jpg",
    HelpCont_04_png:"res/helper/hcont_f04.jpg",
    HelpCont_05_png:"res/helper/hcont_f05.jpg",

    /*voice*/
    Voice_btn_click:"res/voice/btn_click.ogg",
    Voice_close_door:"res/voice/closedoor.ogg",
    Voice_open_door:"res/voice/opendoor.ogg",
    Voice_gun_shoot:"res/voice/gunshoot.ogg",
    Voice_wheeling:"res/voice/wheel.ogg",
    Voice_winline:"res/voice/winline.ogg",
    Voice_shooted:"res/voice/shooted.ogg",
    Voice_shoot_broken:"res/voice/broken.ogg",
    Voice_reel_stop:"res/voice/once_turn_over.ogg",
    Voice_freespin:"res/voice/2freespin.ogg", //*
    Voice_totalwin:"res/voice/totalwin.ogg",
    Voice_cowboy:"res/voice/backmc.ogg"





	

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}