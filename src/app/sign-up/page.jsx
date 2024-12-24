"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { ENDPOINT_VALUE } from "@/utils/CommonConstants";

const SignUp = () => {
  const [mailaddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);

  const inputMailaddress = useCallback((event) => {
    setMailAddress(event.target.value);
  }, []);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  const registAccount = useCallback(() => {
    const data = {
      mailAddress: mailaddress,
      password: password,
      confirmPassword: confirmPassword,
    };
    fetch(ENDPOINT_VALUE + "regist/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setErrorMsg(data["validMsg"]);
        console.log(data);
      })
      .catch((error) => {});
  }, [mailaddress, password, confirmPassword]);

  return (
    <div className="absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-2/4">
      <div className="bg-content-bg-col w-96 h-[580px] border">
        {errorMsg.length !== 0 && (
          <div className="flex justify-center">
            <ul className="pb-1 w-11/12 mt-3 mb-3 rounded border-2 border-l-8 border-red-400 bg-error-field-col">
              {errorMsg.map((msg, index) => {
                return (
                  <li
                    className="ml-1 mt-1 mb-1 text-sm text-red-600"
                    key={index}
                  >
                    {msg}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div
          className={`w-72 m-[auto] ${
            errorMsg.length !== 0 ? "mt-8" : "mt-28"
          }`}
        >
          <Input
            id="mailAddress"
            className="h-10 bg-content-input-col"
            placeholder="メールアドレス"
            onChange={(event) => inputMailaddress(event)}
          />
          <Input
            id="password"
            className="mt-6 h-10 bg-content-input-col"
            type="password"
            placeholder="パスワード"
            onChange={(event) => inputPassword(event)}
          />
          <Input
            id="confirmPassword"
            className="mt-6 h-10 bg-content-input-col"
            type="password"
            placeholder="パスワード再確認"
            onChange={(event) => inputConfirmPassword(event)}
          />
        </div>
        <div className="w-40 h-24 justify-between m-auto mt-16 flex flex-col">
          <Button
            onClick={() => registAccount()}
            className="back bg-btn-common-col1"
          >
            登録する
          </Button>
          <Button>戻る</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
