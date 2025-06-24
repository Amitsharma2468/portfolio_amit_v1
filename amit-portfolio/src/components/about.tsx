export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-white">AKS</span>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong foundation in computer science from Shahjalal
                University of Science and Technology. I specialize in building modern web applications using
                cutting-edge technologies.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                My expertise spans across frontend frameworks like React and Next.js, backend technologies including
                Node.js, and databases like PostgreSQL. I'm always eager to learn new technologies and take on
                challenging projects.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
                  <p className="text-gray-600 dark:text-gray-300">React, Next.js, TypeScript</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h3>
                  <p className="text-gray-600 dark:text-gray-300">Node.js, PostgreSQL, APIs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
