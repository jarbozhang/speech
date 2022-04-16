import React, { useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
// import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import { requirePlugin } from "@tarojs/taro";
import Divider from "../../components/divider";

import "./index.scss";

const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
const regExp = /[|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
const readExample = `In a pattern that has been repeated for more than two years, coronavirus cases are rising again in the D.C. region and nationwide, after a brief respite with some of the lowest rates of virus circulation of the pandemic.`;

const difference = (arr1: Array<String>, arr2: Array<String>) =>
  arr1.filter(x => !arr2.includes(x));

const compoareBetweenString = (str1: String, str2: String): Number => {
  const totalLength = str1.split(" ").length;
  const differenceLength = difference(str1.split(" "), str2.split(" ")).length;
  return 1 - differenceLength / totalLength;
};

const decimalToPercentage = (decimal: number) => {
  return (decimal * 100).toFixed(2) + "%";
};

const Index = () => {
  // const [show] = useModal({
  //   title: "Taro Hooks!",
  //   showCancel: false,
  //   confirmColor: "#8c2de9",
  //   confirmText: "支持一下",
  //   mask: true
  // });
  // const [showToast] = useToast({ mask: true });

  // const handleModal = useCallback(() => {
  //   show({ content: "不如给一个star⭐️!" }).then(() => {
  //     showToast({ title: "点击了支持!" });
  //   });
  // }, [show, showToast]);

  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    manager.onRecognize = function(res) {
      setSpeechText(res.result);
    };
    manager.onStop = function(res) {
      console.log("record file path", res.tempFilePath);
      console.log("result", res.result);
    };
    manager.onStart = function(res) {
      console.log("成功开始录音识别", res);
    };
    manager.onError = function(res) {
      console.error("error msg", res.msg);
    };
    // manager.start({ duration: 3000, lang: "en_US" });
  }, [manager]);

  return (
    <View className="wrapper">
      {/* <Text className="title">为Taro而设计的Hooks Library</Text> */}
      <Text className="desc">{readExample}</Text>
      <Divider />
      {/* <Text className="desc">
        {readExample.toLowerCase().replace(regExp, "")}
      </Text>
      <Divider /> */}
      <Text className="desc">{speechText || '请长按下方按钮，朗读以上句子。'}</Text>
      {speechText && (
        <Text className="title">
          准确率:
          {decimalToPercentage(
            Number(
              compoareBetweenString(
                readExample.toLowerCase().replace(regExp, ""),
                speechText
              ).toFixed(2)
            )
          )}
        </Text>
      )}
      <Button
        className="btn-grad"
        hoverClass="selected"
        hoverStayTime={50}
        onTouchStart={() => {
          manager.start({ duration: 60000, lang: "en_US" });
        }}
        onTouchEnd={() => {
          manager.stop();
        }}
      >
        长按录音
      </Button>
    </View>
  );
};

export default Index;
