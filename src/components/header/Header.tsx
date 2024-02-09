import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import Dialog from "../dialog/Dialog";
import { changeCategory } from "../../actions/category";
import { randomCategory, legacyCategory } from "../../constants/defaults";
import { getPermissionObj, getToken } from "../../utils/permission";
import Nav from "../Nav";
import { AppStore } from "../../reducers";
import { TUser } from "../../types/user";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "src/schema/_g/graphql";

function Header() {
  const info = useSelector<AppStore, TUser>((s) => s.profile.info);
  const token = useSelector<AppStore, string>((s) => s.app.token);
  const categories = useSelector<AppStore, Category[]>((s) => s.app.categories);
  const canRemove = getPermissionObj(info).remove;
  const navigate = useNavigate();

  const onProfileClick = useCallback(() => {
    if (!token) {
      // auth
      navigate("/auth");
      return;
    }

    navigate(`/profile/${info.id}`);
    return;
  }, [token, info.id]);

  const [vis, setVis] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex-col content-between items-center bg-gray-50 bg-opacity-10 py-4 backdrop-blur-md">
      <div className=" flex w-full flex-row items-center justify-around">
        <Link to="/">
          <h2 className="transition-fast text-lg font-medium hover:scale-105 dark:text-gray-200">
            Athena
          </h2>
        </Link>
        <div className="flex flex-row">
          <div
            className="mr-8 cursor-pointer rounded bg-gray-300 px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg dark:bg-gray-700 dark:text-gray-200 hover:dark:bg-gray-600"
            onClick={() => setVis(true)}
          >
            ✨ <span className="ml-2">Categories</span>
          </div>
          <Link
            className="mr-8 py-2 px-4 bg-gray-300 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 rounded dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-gray-200 cursor-pointer"
            to={token ? `/profile/${info.id}` : '/auth'}
          >
            🙍‍ <span className="ml-2">{info.name ? info.name : 'Login'}</span>
          </Link>
        </div>
      </div>
      <Dialog visible={vis} onClose={() => setVis(false)}>
        <Nav categories={categories} onSelected={() => setVis(false)} />
      </Dialog>
    </header>
  );
}

export default Header;
