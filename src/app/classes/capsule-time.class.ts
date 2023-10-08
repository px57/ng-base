
/**
 * @description:
 */
export class CapsuleTime {
    /**
     * @description:
     */
    list_timelaps: Array<string> = [];
  
    /**
     * @description:
     */
    public init() {
      this.list_timelaps = [];
    }

    /**
     * @description: 
     * @returns 
     */
    public moment_to_play() {
      return this.list_timelaps.includes('moment_to_play');
    }
  
    /**
     * @description: 
     */
    public victory_message() {
      return this.list_timelaps.includes('victory');
    }
  
    /**
     * @description:
     */
    public generate_tickets() {
      return this.list_timelaps.includes('generate_tickets');
    }
  
    /**
     * @description:
     */
    public random_draw() {
      return this.list_timelaps.includes('random_draw');
    }
  
    /**
     * @description:
     */
    public wait_before_next_party() {
      return this.list_timelaps.includes('wait_before_next_party');
    }
  
    /**
     * @description:
     */
    public timelaps_is_empty() {
      return this.list_timelaps.length === 0;
    }
  
    /**
     * @description:
     */
    public timelaps_is_not_empty() {
      return !this.timelaps_is_empty();
    }
  }