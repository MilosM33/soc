import Layout from "../Layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold">The Evolution of Our Company</h1>
        <div className="flex flex-col">
          <div className="flex space-x-10">
            <p className="text-lg my-3 text-gray-400 leading-8 w-1/2">
              Our story began in 2015 with a small team of passionate
              individuals who shared a common vision - to build products that
              make a positive impact on people's lives. We started with a simple
              yet ambitious goal: to help businesses leverage the power of
              technology to grow and succeed. Over the years, we have evolved
              into a full-service digital agency with a diverse portfolio of
              clients across various industries. From web design and development
              to digital marketing and e-commerce, our team of experts work
              tirelessly to deliver innovative solutions that drive results.
            </p>
            <img
              src="https://www.datocms-assets.com/7756/1602283211-untitled-design-2020-10-10t063952-064.png?auto=enhance%2Cformat&h=630&w=1200"
              alt=""
              className="w-96 aspect-square object-cover "
            />
          </div>
          <div className="flex space-x-10 mt-32">
            <img
              src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_495142964_198701.jpg"
              alt=""
              className="w-96 "
            />
            <div className="w-1/2">
              <h1 className="text-3xl font-semibold">
                Building Relationships for Success
              </h1>
              <p className="text-lg my-3 text-gray-400 leading-8 ">
                But our success is not just about the products we create or the
                services we offer. It's also about the relationships we build
                along the way. We believe in the power of collaboration and take
                a hands-on approach with every client, working closely with them
                to understand their unique needs and tailor our solutions
                accordingly. As we look to the future, we remain committed to
                our mission of helping businesses thrive in the digital age. We
                are constantly innovating, exploring new technologies, and
                expanding our expertise to provide the best possible solutions
                for our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
