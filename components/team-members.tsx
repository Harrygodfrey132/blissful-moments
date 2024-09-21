import Image from 'next/image'
import TeamMemberImage01 from '@/public/images/team-member-01.jpg'
import TeamMemberImage02 from '@/public/images/team-member-02.jpg'
import TeamMemberImage03 from '@/public/images/team-member-03.jpg'
import TeamMemberImage04 from '@/public/images/team-member-04.jpg'
import TeamMemberImage05 from '@/public/images/team-member-05.jpg'
import TeamMemberImage06 from '@/public/images/team-member-06.jpg'
import TeamMemberImage07 from '@/public/images/team-member-07.jpg'
import TeamMemberImage08 from '@/public/images/team-member-08.jpg'

export default function TeamMembers() {  
  return (
    <section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Small team - Personal in our approach</h2>
          </div>

          {/* Team members */}
          <div className="relative max-w-sm mx-auto grid gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-20 items-start sm:max-w-xl lg:max-w-none" data-aos-id-team>

            {/* 1st member */}
            <div className="text-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-team]">
              <div className="inline-flex mb-4">
                <Image className="rounded-full" src={TeamMemberImage01} width={120} height={120} alt="Member 01" />
              </div>
              <h4 className="h4 font-playfair-display text-slate-800 mb-2">Mark Lamprecht</h4>
              <div className="font-medium text-blue-600">CEO &amp; Co-founder</div>
            </div>

            {/* 2nd member */}
            <div className="text-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-team]" data-aos-delay={100}>
              <div className="inline-flex mb-4">
                <Image className="rounded-full" src={TeamMemberImage02} width={120} height={120} alt="Member 02" />
              </div>
              <h4 className="h4 font-playfair-display text-slate-800 mb-2">Elisa Nguyen</h4>
              <div className="font-medium text-blue-600">Co-Founder, Lead Engineer</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}