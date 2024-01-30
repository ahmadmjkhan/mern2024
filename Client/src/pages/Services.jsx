import React from "react";
import { useAuth } from "../store/auth";

const Services = () => {
  const { services } = useAuth();
  return (
    <>
      <main>
        <div className="container px-4 py-5" id="custom-cards">
          <h2 className="pb-2 border-bottom">Services</h2>

          <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
            {services.map((curElem, index) => {
              const { price, description, provider, service } = curElem;
              return (
                <div className="col" key={index}>
                  <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                      <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                        {service}
                      </h3>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">{description}</li>
                        <li className="d-flex align-items-center me-3">
                          <svg className="bi me-2" width="1em" height="1em">
                            <use xlinkHref="#geo-fill"></use>
                          </svg>
                          <small>{price}</small>
                        </li>
                        <li className="d-flex align-items-center">
                          <svg className="bi me-2" width="1em" height="1em">
                            <use xlinkHref="#calendar3"></use>
                          </svg>
                          <small>{provider}</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="b-example-divider"></div>
      </main>
    </>
  );
};

export default Services;
