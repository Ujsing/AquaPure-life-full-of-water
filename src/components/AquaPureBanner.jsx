import { Button, Tag, Typography, Card } from 'antd';

const { Title, Text } = Typography;

const AquaPureBanner = () => {
  return (
    <div className="min-h-52 mt-3 flex items-center justify-center p-4">
      <Card 
        className="w-full flex overflow-hidden border-2 border-white/10 rounded-3xl !bg-transparent backdrop-blur-sm"
        bodyStyle={{ padding: 0, overflow: 'visible', width:'100vw'}}
        bordered={false}
        
      >
        <div className="p-6 md:p-8 text-white">
          <div className="flex flex-col  justify-between items-start mb-6">
            {/* <div>
              <Title level={1} className="!text-white !mb-0 !text-3xl md:!text-4xl font-bold">
                AquaPure
              </Title>
              <Text className="text-white/80 text-base md:text-lg">
                Pure water for a healthy life
              </Text>
            </div> */}
            <Tag className="mt-3 md:mt-0 !bg-green-500/20 !border-green-400 !text-green-300 !rounded-full !px-4 py-1 text-sm">
              ECO CERTIFIED
            </Tag>
            <div className=" mt-4">
            <span level={2} className="!text-white !mb-0 !text-2xl md:!text-3xl font-bold">
              Drink <span className="text-green-300 ">pure</span>..
            </span>
            <Title level={2} className="!text-white !text-2xl md:!text-3xl  font-semibold opacity-90">
              Ditch plastic forever.
            </Title>
            <Text className="text-white text-base md:text-lg">
                  RO + UV filtered water in recycled glass.60% cheaper than plastic.Zero microplastics.
            </Text>
            
          </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6  my-8">
            <div className="text-center">
              {/* <Text className="text-white/60 text-sm uppercase tracking-wide">Glass Bottle</Text> */}
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">₹8</span>
                <span className="text-white/60">/litre</span>
              </div>
            </div>
             <div className="text-center mt-4">
            <Button 
              type="primary" 
              size="large"
              className="!bg-transparent !border-white/30 !h-auto !py-3 !px-8 !rounded-2xl !text-white !font-semibold !text-lg  hover:!bg-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Order Now
            </Button>
          </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Text className="text-white/80 text-xs">
                ♻️ 100% Plastic-Free • BPA Free • Recycled Glass
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AquaPureBanner;