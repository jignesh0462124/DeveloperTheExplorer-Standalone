import React,{useMemo} from "react";
import { Quote } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function Whatis() {
  const { ref: whatisRef, isRevealed } = useReveal({ threshold: 0.2 });
  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );
  const fadeIn = (delay = 0) => ({
    transitionDelay: `${delay}ms`,
  });

  return (
    <section id="about" ref={whatisRef} className="w-full relative py-24 px-4 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <h2 className={`whatis-title text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 ${fadeUp}`}>
            Why This Event Matters?
            </h2>
            <div className={`w-24 h-1.5 bg-blue-500 mx-auto rounded-full ${fadeUp}`} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                { text: "Because curiosity deserves space to grow.", color: "blue", delay: 100 },
                { text: "Because learning shouldn’t end with lectures or notes.", color: "purple", delay: 200 },
                { text: "Because innovation happens when thinkers, builders, and dreamers come together.", color: "pink", delay: 300 }
            ].map((item, idx) => (
                <div 
                    key={idx} 
                    className={`group relative bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2 ${fadeUp}`} 
                    style={fadeIn(item.delay)}
                >
                    <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r ${
                        item.color === 'blue' ? 'from-blue-400 to-blue-600' :
                        item.color === 'purple' ? 'from-purple-400 to-purple-600' :
                        'from-pink-400 to-pink-600'
                    }`} />
                    
                    <Quote className={`w-10 h-10 mb-6 transform transition-transform duration-500 group-hover:scale-110 ${
                        item.color === 'blue' ? 'text-blue-500' :
                        item.color === 'purple' ? 'text-purple-500' :
                        'text-pink-500'
                    }`} />
                    
                    <p className="text-xl font-medium text-gray-800 leading-relaxed">
                      {item.text}
                    </p>
                </div>
            ))}
        </div>

        <div className={`mt-32 relative rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/40 overflow-hidden text-center group ${fadeUp}`} style={fadeIn(400)}>
            {/* Glass Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl z-0 transition-opacity duration-500 group-hover:opacity-90" />
            
            {/* Content */}
            <p className="relative z-10 text-xl sm:text-2xl text-gray-800 leading-relaxed font-semibold">
              This kind of event exists to turn curiosity into action — where exploration becomes collaboration, ideas evolve into solutions, and learning transforms into a shared experience of creation.
            </p>
        </div>

      </div>
    </section>
  );
}

export default Whatis;
