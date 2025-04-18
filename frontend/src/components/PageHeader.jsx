const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="relative mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
          <p className="mt-2 text-lg text-gray-600">
            {subtitle}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0"></div>
    </div>
  );
};

export default PageHeader; 