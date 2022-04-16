import React, { useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import { requirePlugin } from "@tarojs/taro";
// import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import Divider from "../../components/divider";

import "./index.scss";

const plugin = requirePlugin("soePlugin");
const manager = plugin.getSoeRecorderManager({
  secretId: "AKIDfBUYNxIOFrDKCpCKCpDMG0cGwbBh8Sdh",
  secretKey: "zoSuAC2f6LMAk7GDvRjphLmzxg9NL3Vi"
});
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
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    console.log({ manager });
    manager.onSuccess(res => {
      //打印识别结果
      console.log(res);
    });

    manager.onStart(res => {
      console.log("成功开始录音识别", res);
    });

    manager.onStop(res => {
      console.log("录音已停止", res);
    });

    manager.onError(res => {
      //打印错误
      console.log(res);
    });
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
      <Text className="desc">
        {speechText || "请长按下方按钮，朗读以上句子。"}
      </Text>
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
          console.log("touch start");
          manager.start({ content: readExample, evalMode: 2 });
        }}
        onTouchEnd={() => {
          console.log("touch end");
          manager.stop();
        }}
      >
        长按录音
      </Button>
    </View>
  );
};

export default Index;
