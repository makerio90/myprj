function _switch(i){"images"==i?(switch_visibility("_images",!0),switch_visibility("_code",!1),switch_visibility("_3d",!1),switch_visibility("_pcbs",!1),switch_visibility("_sch",!1),switch_visibility("_bom",!1),switch_visibility("_info",!1)):"code"==i?(switch_visibility("_images",!1),switch_visibility("_code",!0),switch_visibility("_3d",!1),switch_visibility("_pcbs",!1),switch_visibility("_sch",!1),switch_visibility("_bom",!1),switch_visibility("_info",!1)):"3d"==i?(switch_visibility("_images",!1),switch_visibility("_code",!1),switch_visibility("_3d",!0),switch_visibility("_pcbs",!1),switch_visibility("_sch",!1),switch_visibility("_bom",!1),switch_visibility("_info",!1)):"pcbs"==i?(switch_visibility("_images",!1),switch_visibility("_code",!1),switch_visibility("_3d",!1),switch_visibility("_pcbs",!0),switch_visibility("_sch",!1),switch_visibility("_bom",!1),switch_visibility("_info",!1)):"sch"==i?(switch_visibility("_images",!1),switch_visibility("_code",!1),switch_visibility("_3d",!1),switch_visibility("_pcbs",!1),switch_visibility("_sch",!0),switch_visibility("_bom",!1),switch_visibility("_info",!1)):"bom"==i?(switch_visibility("_images",!1),switch_visibility("_code",!1),switch_visibility("_3d",!1),switch_visibility("_pcbs",!1),switch_visibility("_sch",!1),switch_visibility("_bom",!0),switch_visibility("_info",!1)):"info"==i&&(switch_visibility("_images",!1),switch_visibility("_code",!1),switch_visibility("_3d",!1),switch_visibility("_pcbs",!1),switch_visibility("_sch",!1),switch_visibility("_bom",!1),switch_visibility("_info",!0))}function switch_visibility(i,s){document.getElementById(i).style.display,document.getElementById(i).style.display=1==s?"block":"none"}