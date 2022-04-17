import React, { useEffect, useState } from "react";
import { View, Block, Text, Button } from "@tarojs/components";
import { requirePlugin } from "@tarojs/taro";
import { useLoading } from "taro-hooks";
import Divider from "../../components/divider";

import "./index.scss";

interface ISpeechResult {
  PronAccuracy?: number;
  PronCompletion?: number;
  PronFluency?: number;
  Status?: string;
  SuggestedScore?: number;
  Words?: Array<any>;
}

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
  const [speechResult, setSpeechResult] = useState({} as ISpeechResult);
  const [showLoading, hideLoading] = useLoading({
    mask: true,
    title: "识别中..."
  });

  useEffect(() => {
    manager.onSuccess((res: ISpeechResult) => {
      hideLoading();
      setSpeechResult(res);
    });
    manager.onError((res: any) => {
      hideLoading();
      console.log(res);
    });
  }, [manager]);

  return (
    <View className="wrapper">
      <Text className="desc">{readExample}</Text>
      <Divider />
      {speechResult.Words ? (
        <View className="flex">
          {speechResult.Words.map(item => (
            <Text
              className={item.MatchTag !== 0 ? "desc error" : "desc right"}
              key={item.ReferenceWord}
            >
              {item.Word + " " || ""}
            </Text>
          ))}
        </View>
      ) : (
        <Text className="desc center">请长按下方按钮，朗读以上句子。</Text>
      )}

      {speechResult.SuggestedScore && (
        <Block>
          <View className="title">
            精准度: {(speechResult.PronAccuracy || 0).toFixed(2)}
          </View>
          <View className="title">
            流利度: {((speechResult.PronFluency || 0) * 100).toFixed(2)}
          </View>
          <View className="title">
            完整度: {((speechResult.PronCompletion || 0) * 100).toFixed(2)}
          </View>
          <View className="title right">
            总分数: {speechResult.SuggestedScore.toFixed(2)}
          </View>
        </Block>
      )}
      <Button
        className="btn-grad"
        hoverClass="selected"
        hoverStayTime={50}
        onTouchStart={() => {
          setSpeechResult({});
          manager.start({ content: readExample, evalMode: 2 });
        }}
        onTouchEnd={() => {
          manager.stop();
          showLoading();
        }}
      >
        长按录音
      </Button>
    </View>
  );
};

export default Index;
