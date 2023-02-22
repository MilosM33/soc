import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { User } from "../Api/User/User";
import Layout from "../Layout/Layout";

export default function VerifyAccount() {
  const location = useLocation();
  let { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      User.verify({
        token,
      }).then((res) => {
        if (res.data.status === "success") {
          toast.success("Account verified successfully!");
          navigate("/");
        }
        console.log(res.data);
      }).catch((err) => {
        toast.error("Something went wrong!");
      });
    }
  }, [token]);

  return (
    <Layout>
      <div
        className="flex flex-col justify-center items-center mx-auto"
        style={{
          height: "500px",
        }}
      >
        <section className="w-full md:w-1/2 text-center flex flex-col justify-center items-center">
          <h1 className="text-2xl text-secondary my-3">Verify Account</h1>
          <p className="text-gray-400 text-left mb-3">
            Thank you for signing up for our service!
            <br />
          </p>
          <p>
            Before you can start using our platform, we need to verify your
            email address.
          </p>
        </section>
      </div>
    </Layout>
  );
}
