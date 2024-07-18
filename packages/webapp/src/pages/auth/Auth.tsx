import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import fp from "fingerprintjs2";
import { syncAuthStatus } from "@athena/utils/actions/auth";
import PageContainer from "@athena/components/PageContainer";
import Separator from "@athena/components/Separator";
import Status from "./Status";
import { useTitle } from "@athena/utils/hooks/title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { auth, authVariables } from '../../schema/_g/auth'
import {
  AuthDocument,
  AuthQuery,
  AuthQueryVariables,
  Device,
} from '@athena/network/_g/graphql'

function useDevice() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    setTimeout(function () {
      fp.get(
        {
          excludes: {
            touchSupport: false,
          },
        },
        function (components) {
          const audio = components.find((c) => c.key === "audio");
          setDevice({
            version: navigator.platform,
            os: navigator.platform,
            id: audio?.value || "unknown",
            appVersion: "none",
            lang: navigator.language,
          });
        },
      );
    }, 500);
  }, []);

  return device;
}

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  pwd: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AuthPage() {
  const device = useDevice();
  const navigate = useNavigate();
  const f = useFormik({
    initialValues: {
      email: "",
      pwd: "",
    },
    validationSchema: signupSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (
        values.email === "" ||
        values.pwd === "" ||
        Object.keys(f.errors).length > 0
      ) {
        toast.error("data required");
        return;
      }

      return doAuth({
        variables: {
          email: values.email,
          password: values.pwd,
          device: device || ({} as Device),
        },
      }).then((res) => {
        const id = res.data?.auth.id;
        if (!id) {
          return;
        }
        setTimeout(() => {
          navigate(`/profile/${res.data?.auth.id}`);
        }, 100);
      });

      return true;
    },
  });

  useTitle("Auth");

  const [doAuth, { data }] = useLazyQuery<AuthQuery, AuthQueryVariables>(
    AuthDocument,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      return;
    }
    const { token, id } = data.auth;
    dispatch(syncAuthStatus(token, id));
  }, [data]);

  return (
    <PageContainer>
      <div
        className='mt-24 p-4 rounded shadow w-1/2 lg:w-1/3 lg:mt-32 bg-blue-400 bg-opacity-25 backdrop-blur-3xl'
      >
        <h2 className='text-lg text-center dark:text-white'>🔑 Auth</h2>
        <Separator />
        <form onSubmit={f.handleSubmit}>
          <div className="mb-2 w-full">
            <input
              className="w-full rounded-sm bg-gray-200 bg-opacity-20 p-2 focus:outline-none"
              value={f.values.email}
              name="email"
              type="email"
              onChange={f.handleChange}
              placeholder="Email"
            />
            {f.errors.email && (
              <span className="with-fade-in block w-full bg-red-400 p-2">
                {f.errors.email}
              </span>
            )}
          </div>
          <div className="mb-2 w-full">
            <input
              className="w-full rounded-sm bg-gray-200 bg-opacity-20 p-2 focus:outline-none"
              value={f.values.pwd}
              type="password"
              name="pwd"
              onChange={f.handleChange}
              placeholder="Password"
            />
            {f.errors.pwd && (
              <span className="with-fade-in block w-full bg-red-400 p-2">
                {f.errors.pwd}
              </span>
            )}
          </div>
          <div>
            <button
              type='submit'
              disabled={f.isSubmitting || !f.isValid}
              className='w-full p-4 rounded shadow-lg focus:outline-none bg-gradient-to-tr from-gray-400 to-blue-400 disabled:from-gray-300 disabled:to-gray-300'
            >
              <Status loading={f.isSubmitting} />
            </button>
          </div>
        </form>
        {/* <Alert text='不支持用户注册，非盈利项目' /> */}
      </div>
    </PageContainer>
  );
}

export default AuthPage;
