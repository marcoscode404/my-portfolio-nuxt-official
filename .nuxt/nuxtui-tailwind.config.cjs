
      const { defaultExtractor: createDefaultExtractor } = require('tailwindcss/lib/lib/defaultExtractor.js')
      const { customSafelistExtractor, generateSafelist } = require("/home/marcos-vini/Documentos/www/my-portfolio-nuxt-official/node_modules/.pnpm/@nuxt+ui@2.19.2_axios@1.7.7_change-case@5.4.4_jwt-decode@3.1.2_magicast@0.3.5_rollup@4.24.4_s_cla7d6oojom2r2eja4c22p4gii/node_modules/@nuxt/ui/dist/runtime/utils/colors")

      const defaultExtractor = createDefaultExtractor({ tailwindConfig: { separator: ':' } })

      module.exports = {
        plugins: [
          require('@tailwindcss/forms')({ strategy: 'class' }),
          require('@tailwindcss/aspect-ratio'),
          require('@tailwindcss/typography'),
          require('@tailwindcss/container-queries'),
          require('@headlessui/tailwindcss')
        ],
        content: {
          files: [
            "/home/marcos-vini/Documentos/www/my-portfolio-nuxt-official/node_modules/.pnpm/@nuxt+ui@2.19.2_axios@1.7.7_change-case@5.4.4_jwt-decode@3.1.2_magicast@0.3.5_rollup@4.24.4_s_cla7d6oojom2r2eja4c22p4gii/node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}",
            "/home/marcos-vini/Documentos/www/my-portfolio-nuxt-official/node_modules/.pnpm/@nuxt+ui@2.19.2_axios@1.7.7_change-case@5.4.4_jwt-decode@3.1.2_magicast@0.3.5_rollup@4.24.4_s_cla7d6oojom2r2eja4c22p4gii/node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}"
          ],
          transform: {
            vue: (content) => {
              return content.replaceAll(/(?:\r\n|\r|\n)/g, ' ')
            }
          },
          extract: {
            vue: (content) => {
              return [
                ...defaultExtractor(content),
                ...customSafelistExtractor("U", content, ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary"], ["primary"])
              ]
            }
          }
        },
        safelist: generateSafelist(["primary"], ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary"]),
      }
    