import React from "react";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";

const About = () => {
  return (
    <>
      <div className="max_padd_container flexCenter flex-col pt-32">
        <div className="container bg-image text-center">
          <h1 className="h1 overlay-text">About Us</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 m-8">
        <p className="d-flex justify-content-center align-items-center p-3 border-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quo
          dolores amet minima nesciunt illo fugit illum molestias eos.
          Architecto molestias alias quos aut rem unde, minima doloremque
          dolorum mollitia! Rerum dicta repellendus eum, itaque sit delectus
          quibusdam laboriosam, eius impedit quia commodi magnam quaerat soluta
          est quis natus dolorum! Necessitatibus omnis distinctio, magni nobis
          architecto accusamus veritatis? Voluptatem quos omnis itaque alias,
          error nam laudantium tempora mollitia ipsa assumenda veniam nemo
          sapiente non repudiandae ut quisquam harum eum asperiores eveniet
          veritatis accusamus totam? Excepturi sint omnis obcaecati, odio
          provident fugit aspernatur architecto laudantium ab! Maxime veritatis
          corrupti ipsa vitae?
        </p>
        <div className="d-flex h-80 justify-content-center border-l-gray-50 border-l-2 w-auto">
          <img className="rounded-2xl" src={about2} />
        </div>
      </div>
      <div className="grid grid-cols-2 m-8">
        <div className="d-flex h-80 justify-content-center border-r-gray-50 border-r-2 w-auto">
          <img className="rounded-2xl" src={about3} />
        </div>

        <p className="d-flex justify-content-center align-items-center p-3 border-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quo
          dolores amet minima nesciunt illo fugit illum molestias eos.
          Architecto molestias alias quos aut rem unde, minima doloremque
          dolorum mollitia! Rerum dicta repellendus eum, itaque sit delectus
          quibusdam laboriosam, eius impedit quia commodi magnam quaerat soluta
          est quis natus dolorum! Necessitatibus omnis distinctio, magni nobis
          architecto accusamus veritatis? Voluptatem quos omnis itaque alias,
          error nam laudantium tempora mollitia ipsa assumenda veniam nemo
          sapiente non repudiandae ut quisquam harum eum asperiores eveniet
          veritatis accusamus totam? Excepturi sint omnis obcaecati, odio
          provident fugit aspernatur architecto laudantium ab! Maxime veritatis
          corrupti ipsa vitae?
        </p>
      </div>
      <div className="grid grid-cols-2 m-8">
        <p className="d-flex justify-content-center align-items-center p-3 border-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quo
          dolores amet minima nesciunt illo fugit illum molestias eos.
          Architecto molestias alias quos aut rem unde, minima doloremque
          dolorum mollitia! Rerum dicta repellendus eum, itaque sit delectus
          quibusdam laboriosam, eius impedit quia commodi magnam quaerat soluta
          est quis natus dolorum! Necessitatibus omnis distinctio, magni nobis
          architecto accusamus veritatis? Voluptatem quos omnis itaque alias,
          error nam laudantium tempora mollitia ipsa assumenda veniam nemo
          sapiente non repudiandae ut quisquam harum eum asperiores eveniet
          veritatis accusamus totam? Excepturi sint omnis obcaecati, odio
          provident fugit aspernatur architecto laudantium ab! Maxime veritatis
          corrupti ipsa vitae?
        </p>
        <div className="d-flex h-80 justify-content-center border-l-gray-50 border-l-2 w-auto">
          <img className="rounded-2xl" src={about4} />
        </div>
      </div>
    </>
  );
};

export default About;
