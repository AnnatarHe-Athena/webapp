import React, { useEffect, useState } from "react";
import styled from "styled-components";
import chunk from "lodash/chunk";
import { useMutation } from "@apollo/client";
import Select from "@athena/components/src/select/Select"
import Card from "@athena/components/src/card/Card";
import JSONTextarea from "@athena/components/src/json-textarea/json-textarea";

import PageContainer from "@athena/components/src/PageContainer";
import Button from "@athena/components/src/button/Button";
import Separator from "@athena/components/src/Separator";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  AddGirlCellsDocument,
  AddGirlCellsMutation,
  AddGirlCellsMutationVariables,
  Category,
} from "@athena/network/_g/graphql"

const TextTip = styled.span`
  padding: 1rem 0;
  font-size: 14px;
  display: block;
  font-style: italic;
  a {
    color: #03a9f4;
  }
`;

const ReadyToUpload = styled.table`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  thead tr:first-child {
    background-color: #f7f7f7;
  }
  tbody tr:nth-child(2n) {
    background-color: #f7f7f7;
  }
  td,
  th {
    padding: 1rem;
    color: #333333;
    border: 0;
    max-width: 2rem;
  }
  thead th {
    font-weight: 400;
    line-height: 1.6;
    color: #7e848c;
  }
`;

const InputField = styled.div`
  input {
    border: none;
    width: 100%;
    padding: 1rem 0.3rem;
    outline: none;
    transition: all 0.35s;
    border: 1px solid transparent;
    margin-bottom: 0.5rem;
    &:focus {
      border-bottom-color: #888;
    }
  }
`;

const Submits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const premissionOptions = [
  {
    value: 2,
    label: "Public",
  },
  {
    value: 3,
    // visiable user him/herself only
    label: "Private",
  },
];

type cellInput = {
  img: string
  text: string
  cate: number
  permission: number
  fromID: string
  fromURL: string
}
// CreateItems.propTypes = {
//   client: PropTypes.any,
//   categories: PropTypes.arrayOf(PropTypes.any)
// }

function CreateItems() {
  const categories = useSelector<any, Category[]>((s) => s.app.categories).map(
    (x) => ({ ...x, id: ~~x.id }),
  );
  const [doAddCells, { loading }] = useMutation<
    AddGirlCellsMutation,
    AddGirlCellsMutationVariables
  >(AddGirlCellsDocument);
  const [cells, setCells] = useState<cellInput[]>([]);

  const formikData = useFormik<cellInput>({
    initialValues: {
      img: "",
      text: "",
      cate: -1,
      permission: 2,
      fromID: "",
      fromURL: "",
    },
    onSubmit(vals) {
      console.log(vals);
      setCells((cs) => cs.concat(vals));
      formikData.resetForm({});
    },
  });

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    // 加载完，初始化
    if (formikData.values.cate > 0) {
      return;
    }

    formikData.setFieldValue("cate", categories[0].id);
  }, [categories.length]);

  const upload = async () => {
    const localCells = cells.map<cellInput>((x) => {
      const url = x.img;
      let newImg = url;
      // 判定当前是否是新浪图床的图片，是的话只截取对应的部分 url， 否则截取全体的
      if (url.indexOf(".sinaimg.cn") < 15 && url.indexOf(".sinaimg.cn") > 5) {
        const lastUrl = url.split("/");
        newImg = lastUrl[lastUrl.length - 1];
      }
      x.img = url;
      return {
        ...x,
        img: newImg,
      };
    });
    if (localCells.length === 0) {
      toast.error("need information to upload");
      return;
    }

    await _uploadAction(localCells);
    setCells([]);
  };

  const _uploadAction = async (cells: cellInput[]) => {
    try {
      await doAddCells({
        variables: {
          cells,
        },
      });

      toast.success("😄 upload done!!!");
    } catch (e) {
      toast.error("🙅‍ upload Error");
    }
  };

  const uploadJSON = async (value: any[]) => {
    const newCellList = value.map<cellInput>((v: cellInput) => {
      return {
        img: v.img,
        text: v.text,
        cate: v.cate || 11,
        permission: premissionOptions[0].value,
        fromID: v.fromID,
        fromURL: v.fromURL,
      };
    });
    const slice = chunk(newCellList, 20);
    for (let c of slice) {
      await _uploadAction(c);
    }
  };

  const tableContent = cells.map((x, i) => {
    return (
      <tr key={i}>
        {Object.keys(x).map((k, ind) => {
          console.log(x, k, (x as any)[k]);
          if (k === "cate") {
            return (
              <td key={ind}>
                {categories.find((item) => item.id === (x as any)[k])?.name}
              </td>
            );
          }
          if (k === "permission") {
            return (
              <td key={ind}>
                {
                  premissionOptions.find((item) => item.value === (x as any)[k])
                    ?.label
                }
              </td>
            );
          }
          return <td key={ind}>{(x as any)[k]}</td>;
        })}
      </tr>
    );
  });

  return (
    <PageContainer>
      <Card>
        <h2 className="text-black-200 text-lg">Create Cells</h2>
        <Separator />
        <JSONTextarea onUpload={uploadJSON} />
        <Separator />
        <ReadyToUpload>
          <thead>
            <tr>
              {["图片URL", "图片介绍", "分类", "权限", "fromID", "fromURL"].map(
                (x, i) => {
                  return <th key={i}>{x}</th>;
                },
              )}
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </ReadyToUpload>
        <Separator />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikData.submitForm();
          }}
        >
          <InputField>
            <input
              type="url"
              name="img"
              onChange={formikData.handleChange}
              placeholder="URL"
              value={formikData.values.img}
            />
            <input
              type="text"
              name="text"
              onChange={formikData.handleChange}
              placeholder="TEXT"
              value={formikData.values.text}
            />
            <input
              type="text"
              name="fromID"
              onChange={formikData.handleChange}
              placeholder="FROM ID"
              value={formikData.values.fromID}
            />
            <input
              type="text"
              name="fromURL"
              onChange={formikData.handleChange}
              placeholder="FROM URL"
              value={formikData.values.fromURL}
            />
            <Select
              name="cate"
              value={formikData.values.cate}
              options={categories.map((x) => ({ label: x.name, value: x.id }))}
              placeholder="Category"
              onChange={formikData.handleChange}
            />
            <Select
              name="permission"
              value={formikData.values.permission}
              options={premissionOptions}
              placeholder="Premission"
              onChange={formikData.handleChange}
            />
          </InputField>
          <TextTip>
            推荐使用新浪微博图床上传优秀的照片，其他服务也是允许的。{" "}
            <a
              href="https://chrome.google.com/webstore/detail/%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A%E5%9B%BE%E5%BA%8A/fdfdnfpdplfbbnemmmoklbfjbhecpnhf?hl=zh-CN"
              target="_blank"
              rel="noopener noreferrer"
            >
              新浪微博图床
            </a>
          </TextTip>
          <Submits>
            <Button
              color="ghost"
              size="medium"
              type="submit"
              disabled={!formikData.isValid}
            >
              Save
            </Button>
            <Button
              color="blue"
              size="medium"
              onClick={upload}
              disabled={cells.length === 0}
            >
              Upload
            </Button>
          </Submits>
        </form>
      </Card>
    </PageContainer>
  );
}


export default CreateItems;
